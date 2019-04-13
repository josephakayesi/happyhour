const Validator = require('validator')
const isEmpty = require('./isEmpty')
const isViable = require('./isViable')

module.exports = validateRegisterInput = data => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ''

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (!Validator.isLength(data.password, { min: 16, max: 30 })) {
        errors.password = 'Password must be at least 16 characters'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Password must match'
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm password field is required'
    }
        
    return {
        errors,
        // isValid: isEmpty(isViable(data.password, errors))
        isValid: !isEmpty(errors) ? isEmpty(errors) : isEmpty(isViable(data.password, errors))
    }
} 
