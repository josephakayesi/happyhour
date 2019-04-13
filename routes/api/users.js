const router = require('express').Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const { transporter } = require('../../config/nodemailer')

// Load Input Validation    
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load models
const User = require('../../models/User')
const LoginFailureLog = require('../../models/LoginFailureLog')
const BarAccountLog = require('../../models/BarAccountLog')

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users route works' }))

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(() => console.log(err))
                    })
                })
            }
        })
})

// @route   POST api/users/login
// @desc    Login user / Returning JWT
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            // Check if account barred
            BarAccountLog.find({ user: user._id, ip: req.body.ip })
                .sort({ timeTillUnbarred: -1 })
                .limit(1)
                .then(barred => {
                    if (barred) {
                        let barredDate = barred.length == 0 ? 0 : barred[0].timeTillUnbarred

                        if (new Date(Date.now()) < barredDate) {
                            errors.barredDate = new Date(barred[0].timeTillUnbarred)
                            errors.accountBarred = true
                            return res.status(400).json(errors)
                        }
                        else {
                            // Check password
                            bcrypt.compare(password, user.password)
                                .then(isMatch => {
                                    if (isMatch) {
                                        // User matched
                                        const payload = { id: user.id, name: user.name, avatar: user.avatar }
                                        // Sign token
                                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                            res.json({ success: true, token: `Bearer ${token}` })
                                        })
                                    }
                                    else {

                                        const newLoginFailure = new LoginFailureLog({
                                            user: user.id,
                                            ip: req.body.ip
                                        })

                                        newLoginFailure.save()
                                            .then(() => {
                                                LoginFailureLog.countDocuments({ ip: req.body.ip, user: user.id })
                                                    .then(count => {
                                                        console.log(count)
                                                        if (count % 3 == 0) {
                                                            // Bar account for 5 minutes
                                                            newBarAccountLog = new BarAccountLog({
                                                                user: user.id,
                                                                ip: req.body.ip
                                                            })
                                                            newBarAccountLog.save()

                                                            errors.accountBarred = true
                                                            errors.barredDate = new Date(Date.now() + 3000)

                                                            let helperOptions = {
                                                                from: '"Happy Hour" <happyhourcodelnapp@gmail.com>',
                                                                to: email,
                                                                subject: 'Account check',
                                                                text: `Someone is trying to access your account from ${req.body.ip}`
                                                            }
                                                            transporter.sendMail(helperOptions, (error, info) => {
                                                                if (error) return console.log(error)
                                                                console.log('Message was sent')
                                                                console.log(info)
                                                            })
                                                        }
                                                    })
                                                    .then(() => {
                                                        errors.password = 'Password incorrect'
                                                        return res.status(400).json(errors)
                                                    })
                                                    .catch(err => console.log(err))
                                            })
                                            .catch(err => console.log(err))
                                    }
                                })
                                .catch(err => console.log(err))
                        }
                    }
                })
                .catch(err => console.log(err))


        })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    })
})

module.exports = router