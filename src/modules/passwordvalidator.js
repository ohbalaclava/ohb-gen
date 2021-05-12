class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
  }
}

const PasswordValidator = (function () {
  const MINIMUM_PASSWORD_LENGTH = 11
  const PASSWORD_SYMBOLS = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/

  const _assert = (booleanValue, message) => {
    if (!booleanValue) {
      throw new ValidationError(message)
    }
  }

  const validate = (password) => {
    _assert(password !== undefined, 'no value')
    _assert(typeof password === 'string', 'not a string')
    _assert(password.length >= MINIMUM_PASSWORD_LENGTH, `must have at least ${MINIMUM_PASSWORD_LENGTH} characters`)
    _assert(password.match(/[a-z]/), 'must contain at least one lowercase letter')
    _assert(password.match(/[A-Z]/), 'must contain at least one uppercase letter')
    _assert(password.match(/\d/), 'must contain at least one number')
    _assert(password.match(PASSWORD_SYMBOLS), `must contain at least one symbol from: ${PASSWORD_SYMBOLS.toString()}`)
  }

  return {
    validate
  }
}())

export { PasswordValidator, ValidationError }
