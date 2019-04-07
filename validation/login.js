const validator = require('validator')
const isEmpty = require('./isEmpty')
const magicPassword = require('../config/keys').magicPassword

module.exports = validateRegisterInput = data => {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ''
    data.magicPassword = !isEmpty(data.magicPassword) ? data.magicPassword : ''

    //TODO : Arrange validation like in happyhour
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters'
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (!validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Username must be between 2 and 30 characters'
    }

    if (validator.isEmpty(data.username)) {
        errors.username = 'Username field is required'
    }

    if (!validator.isAlphanumeric(data.username)) {
        errors.username = 'Username field should not include regex characters.'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email field is invalid'
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required'
    }

    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match'
    }

    // TODO : Pass magic password fron environment variable.
    if (!validator.equals(data.magicPassword, magicPassword)) {
        errors.magicPassword = 'Magic Password is invalid'
    }
    
    if (validator.isEmpty(data.magicPassword)) {
        errors.magicPassword = 'Magic Password field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 