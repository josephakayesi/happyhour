const nodemailer = require('nodemailer')
const keys = require('./keys')

// Nodemailer config
module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: keys.senderEmail,
            pass: keys.senderPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })
}