class ValidationError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
  }
}

function PasswordValidator (minPasswordLength) {
  minPasswordLength = minPasswordLength || 10
  const PASSWORD_SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  const PASSWORD_SYMBOLS_RX = new RegExp(`[${PASSWORD_SYMBOLS}]`)

  const _assert = (booleanValue, message) => {
    if (!booleanValue) {
      throw new ValidationError(message)
    }
  }

  this.validate = (password) => {
    _assert(password !== undefined, 'no value')
    _assert(typeof password === 'string', 'not a string')
    _assert(password.length >= minPasswordLength, `must have at least ${minPasswordLength} characters`)
    _assert(password.match(/[a-z]/), 'must contain at least one lowercase letter')
    _assert(password.match(/[A-Z]/), 'must contain at least one uppercase letter')
    _assert(password.match(/\d/), 'must contain at least one number')
    _assert(password.match(PASSWORD_SYMBOLS_RX), `must contain at least one symbol from: ${PASSWORD_SYMBOLS}`)
  }
}

export { PasswordValidator, ValidationError }
