const isEmpty = require('../validation/isEmpty')

test('isEmpty should return boolean', () => {
    const boolean = isEmpty({})
    expect(typeof boolean).toBe('boolean')
})