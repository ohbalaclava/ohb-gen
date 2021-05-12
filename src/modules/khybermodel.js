import { PasswordGenerator } from './passwordgenerator'
import { PasswordValidator, ValidationError } from './passwordvalidator'

const model = (function () {
  const VALID_MASTER_PASSWORD_CLASSES = 'bg-green-200'
  const INVALID_MASTER_PASSWORD_CLASSES = 'bg-red-200'

  const _data = new PasswordGenerator.PasswordMetaData()
  let _generatedPassword = ''
  let _isValidPassword = false
  let _validationError = ''

  const getMasterPassword = () => _data.masterPassword

  const setMasterPassword = masterPassword => {
    _data.masterPassword = masterPassword
    try {
      PasswordValidator.validate(_data.masterPassword)
      _isValidPassword = true
      _generatePassword()
    } catch (error) {
      _isValidPassword = false
      if (error instanceof ValidationError) {
        _validationError = error
      } else {
        throw error
      }
    }
  }

  const getMasterPasswordValidationClasses = () => {
    if (_data.masterPassword.length === 0) {
      return ''
    } else if (_isValidPassword) {
      return VALID_MASTER_PASSWORD_CLASSES
    } else {
      return INVALID_MASTER_PASSWORD_CLASSES
    }
  }

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

  const incrementPasswordLength = () => { _data.passwordLength++; _updatePassword() }

  const decrementPasswordLength = () => { _data.passwordLength--; _updatePassword() }

  const getPasswordLength = () => _data.passwordLength

  const setPasswordLength = passwordLength => { _data.passwordLength = passwordLength; _updatePassword() }

  const getGeneratedPassword = () => _generatedPassword

  const _generatePassword = () => {
    try {
      _generatedPassword = PasswordGenerator.generatePassword(_data)
    } catch (error) {
      if (!(error instanceof PasswordGenerator.VerificationError)) {
        console.log(error)
      }
    }
  }

  const _updatePassword = () => _isValidPassword && _generatePassword()

  const copyToClipboard = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(_generatedPassword)
    }
  }

  const save = () => {}

  return {
    getMasterPassword,
    setMasterPassword,
    getMasterPasswordValidationClasses,
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
    copyToClipboard,
    save
  }
})()

export { model as default }
