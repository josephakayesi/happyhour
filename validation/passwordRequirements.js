module.exports = password => {
    return {
        symbols: /[ !@#$%^&*()_+\-=\];':"\\|,.<>?]{2}/g,
        numbers: /[0-9]{2}/g,
        lowerCharacters: /[a-z]/g,
        upperTwoFirstChars: /^[A-Z]{2}/,
        isRepeated: /(.).*\1/.test(password),
        ambiguousCharacters: /[\.\/,;:{}`~()><\[\]]/g
    }
}