const isViable = require('../validation/isViable')

test('isViable should return object', () => {
    const result = isViable('password', {})
    expect(typeof result).toBe('object')
})