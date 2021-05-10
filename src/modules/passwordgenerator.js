import { SHA256 } from 'crypto-es/lib/sha256'
import { MD5 } from 'crypto-es/lib/md5'

class VerificationError extends Error {
  constructor (message) {
    super(`Password verification error: ${message}`)
    this.name = this.constructor.name
  }
}

const PasswordGenerator = (function () {
  const newData = () => {
    return {
      masterPassword: '',
      keyword: '',
      legacy: true,
      includeNumbers: true,
      includeSymbols: true,
      illegalChars: '',
      passwordLength: 24,
      notes: ''
    }
  }

  const _assert = (booleanValue, message) => {
    if (!booleanValue) {
      throw new VerificationError(message)
    }
  }

  function _wordArrayToString (wordArray) {
    return String.fromCharCode(...wordArray.words.flatMap((word) => {
      const bytes = []
      bytes.push(word >>> 24)
      bytes.push((word >>> 16) & 0xff)
      bytes.push((word >>> 8) & 0xff)
      bytes.push(word & 0xff)
      return bytes
    })).slice(0, wordArray.sigBytes)
  }

  const _verifyData = (data) => {
    _assert(data !== undefined, 'password data is undefined')
    _assert(data.masterPassword, 'the master password is empty')
    _assert(data.keyword, 'the keyword is empty')
  }

  const _generateLegacyPassword = (data) => {
    function hash (value) {
      return _wordArrayToString(MD5(value))
    }

    function getHashable (previousHashable) {
      return previousHashable + data.masterPassword + 'pemisah' + data.keyword
    }

    function isLetter (character) {
      return (character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z')
    }

    function isDigit (character) {
      return character >= '0' && character <= '9'
    }

    function isValidSymbol (character) {
      return '.,?!_/@#$%&*'.indexOf(character) >= 0
    }

    function isIllegalCharacter (character) {
      return data.illegalChars.indexOf(character) >= 0
    }

    function isValidCharacter (character) {
      return (isLetter(character) || (data.includeNumbers && isDigit(character)) || (data.includeSymbols && isValidSymbol(character))) && !isIllegalCharacter(character)
    }

    function filter (value) {
      return [...value].filter(isValidCharacter).join('')
    }

    _verifyData(data)

    let hashable = ''
    let hashed = ''
    while (hashed.length < data.passwordLength) {
      hashable = getHashable(hashable)
      hashed += filter(hash(hashable))
    }
    return hashed.slice(0, data.passwordLength)
  }

  const _generateStandardPassword = (data) => {

  }

  const generatePassword = (data) => (data.legacy) ? _generateLegacyPassword(data) : _generateStandardPassword(data)

  return {
    newData,
    generatePassword
  }
})()

export { PasswordGenerator, VerificationError }
