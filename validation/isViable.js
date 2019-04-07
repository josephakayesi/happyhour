module.exports = isViable = (password, errors) => {
    // check for symbols
    let symbols = /[ !@#$%^&*()_+\-=\];':"\\|,.<>?]{2}/g
    if (password.match(symbols) == null) {
        errors.password = 'Password must contain at least 2 symbols'
        return errors
    }

    // check for numbers
    let numbers = /[0-9]{2}/g
    if (password.match(numbers) == null) {
        errors.password = 'Password must contain at least 2 numbers'
        return errors
    }

    // check for lower characters
    let lowerCharacters = /[a-z]/g
    if (password.match(lowerCharacters) == null) {
        errors.password = 'Password must contain at least one lower character'
        return errors
    }

    // check uppercase for 2 first characters
    let upperTwoFirstChars = /^[A-Z]{2}/
    if (password.match(upperTwoFirstChars) == null) {
        errors.password = 'The first two characters must be uppercase'
        return errors
    }

    // check for repeated characters
    let isRepeated = /(.).*\1/.test(password);
    if (isRepeated) {
        errors.password = 'Password must not have repeated characters'
        return errors
    }

    //check for ambiguos characters
    let ambiguousCharacters = /[\.\/,;:{}`~()><\[\]]/g
    if (password.match(ambiguousCharacters)) {
        errors.password = 'Password must not contain ambiguous characters eg. {}[]()/\'"`~,;:.<>'
        return errors
    }
    return errors
}

