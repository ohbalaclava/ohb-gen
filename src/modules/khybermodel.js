import { PasswordGenerator } from './passwordgenerator'
import { PasswordValidator, ValidationError } from './passwordvalidator'

const m = require('mithril')

const model = (function () {
  const _VALIDATION_SUCCESS_HINT = 'boat drinks'
  const _PASSWORD_EXPIRY_TIME = 120000 /* 2 minutes */

  const _data = new PasswordGenerator.PasswordMetaData()
  let _generatedPassword = ''
  let _isValidPassword = false
  let _validationHint = ''
  let _passwordExpiryTimeoutID = null

  const _isInfinite = window.location.hostname.split('.')[0] === 'infinite'
  if (_isInfinite) {
    _data.legacy = true
    _data.passwordLength = 16
    document.title = 'infinite'
  }
  const _passwordValidator = new PasswordValidator(16)

  const getMasterPassword = () => _data.masterPassword

  const setMasterPassword = masterPassword => {
    _data.masterPassword = masterPassword
    try {
      if (!_isInfinite) {
        _passwordValidator.validate(_data.masterPassword)
        _validationHint = _VALIDATION_SUCCESS_HINT
      }
      _isValidPassword = true
      _generatePassword()
    } catch (error) {
      _isValidPassword = false
      _generatedPassword = ''
      _clearPasswordExpiryTimeout()
      if (error instanceof ValidationError) {
        _validationHint = error.message
      } else {
        throw error
      }
    }
  }

  const isMasterPasswordValid = () => _isValidPassword

  const getValidationHint = () => _validationHint

  const getKeyword = () => _data.keyword

  const setKeyword = keyword => { _data.keyword = keyword; _updatePassword() }

  const getLegacy = () => _data.legacy

  const setLegacy = legacy => { _data.legacy = legacy; _updatePassword() }

  const getNotes = () => _data.notes

  const setNotes = notes => { _data.notes = notes }

  const getIncludeNumbers = () => _data.includeNumbers

  const setIncludeNumbers = includeNumbers => { _data.includeNumbers = includeNumbers; _updatePassword() }

  const getIncludeSymbols = () => _data.includeSymbols

  const setIncludeSymbols = includeSymbols => { _data.includeSymbols = includeSymbols; _updatePassword() }

  const getIllegalCharacters = () => _data.illegalChars

  const setIllegalCharacters = illegalChars => { _data.illegalChars = illegalChars; _updatePassword() }

  const incrementPasswordLength = () => setPasswordLength(_data.passwordLength + 1)

  const decrementPasswordLength = () => setPasswordLength(_data.passwordLength - 1)

  const getPasswordLength = () => _data.passwordLength

  const setPasswordLength = passwordLength => { _data.passwordLength = passwordLength; _updatePassword() }

  const getGeneratedPassword = () => _generatedPassword

  const _generatePassword = () => {
    try {
      _generatedPassword = PasswordGenerator.generatePassword(_data)
      _resetPasswordExpiryTimeout()
    } catch (error) {
      _generatedPassword = ''
      if (!(error instanceof PasswordGenerator.VerificationError)) {
        console.log(error)
      }
    }
  }

  const getPasswordExpiryTime = () => {
    return _passwordExpiryTimeoutID ? _PASSWORD_EXPIRY_TIME.toString() : ''
  }

  const _clearPasswords = () => {
    setMasterPassword('')
    _passwordExpiryTimeoutID = null
    m.redraw()
  }

  const _clearPasswordExpiryTimeout = async () => {
    if (_passwordExpiryTimeoutID) {
      clearTimeout(_passwordExpiryTimeoutID)
      _passwordExpiryTimeoutID = null
    }
  }

  const _resetPasswordExpiryTimeout = () => {
    _clearPasswordExpiryTimeout()
    _passwordExpiryTimeoutID = setTimeout(_clearPasswords, _PASSWORD_EXPIRY_TIME)
  }

  const _updatePassword = () => _isValidPassword && _generatePassword()

  const isInfinite = () => _isInfinite

  const save = () => {}

  return {
    getMasterPassword,
    setMasterPassword,
    isMasterPasswordValid,
    getValidationHint,
    getKeyword,
    setKeyword,
    getLegacy,
    setLegacy,
    getNotes,
    setNotes,
    getIncludeNumbers,
    setIncludeNumbers,
    getIncludeSymbols,
    setIncludeSymbols,
    getIllegalCharacters,
    setIllegalCharacters,
    getPasswordLength,
    setPasswordLength,
    incrementPasswordLength,
    decrementPasswordLength,
    getGeneratedPassword,
    getPasswordExpiryTime,
    isInfinite,
    save
  }
})()

export { model as default }
