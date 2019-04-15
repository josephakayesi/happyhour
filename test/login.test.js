const validateLoginInput = require('../validation/login')

describe('validateInput should return object', () => {
    test('for properly supplied input', () => {
        const data = {
            email: 'input@email.com',
            password: 'password'
        }
    
        const result = validateLoginInput(data)
        expect(typeof result).toBe('object')
    })
    
    test('for empty input properties', () => {
        const data = {
            email: '',
            password: ''
        }
    
        const result = validateLoginInput(data)
        expect(typeof result).toBe('object')
    })
    
    test('for empty password property', () => {
        const data = {
            email: 'input@email.com',
            password: ''
        }
    
        const result = validateLoginInput(data)
        expect(typeof result).toBe('object')
    })

    test('for empty email property', () => {
        const data = {
            email: '',
            password: 'password'
        }
    
        const result = validateLoginInput(data)
        expect(typeof result).toBe('object')
    })

    test('for invalid email property', () => {
        const data = {
            email: 'input.com',
            password: 'password'
        }
    
        const result = validateLoginInput(data)
        expect(typeof result).toBe('object')
    })
})
