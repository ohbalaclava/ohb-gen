import { SHA256 } from 'crypto-es/lib/sha256'
import { MD5 } from 'crypto-es/lib/md5'

class VerificationError extends Error {
  constructor (message) {
    super(`Password verification error: ${message}`)
    this.name = this.constructor.name
  }
}

const _createGenerator = (getHashable, hash, symbolString, postProcess) => {
  let _metadata

  const _assert = (booleanValue, message) => {
    if (!booleanValue) {
      throw new VerificationError(message)
    }
  }

  const _verifyMetaData = (metadata) => {
    _assert(metadata !== undefined, 'password metadata is undefined')
    _assert(metadata.masterPassword, 'the master password is empty')
    _assert(metadata.keyword, 'the keyword is empty')
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

  function isLetter (character) {
    return (character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z')
  }

  function isDigit (character) {
    return character >= '0' && character <= '9'
  }

  function isValidSymbol (character) {
    return symbolString.indexOf(character) >= 0
  }

  function isIllegalCharacter (character) {
    return _metadata.illegalChars.indexOf(character) >= 0
  }

  function isValidCharacter (character) {
    return (isLetter(character) || (_metadata.includeNumbers && isDigit(character)) || (_metadata.includeSymbols && isValidSymbol(character))) && !isIllegalCharacter(character)
  }

  function filter (value) {
    return [...value].filter(isValidCharacter).join('')
  }

  return (metadata) => {
    _metadata = metadata

    _verifyMetaData(_metadata)

    let hashable = ''
    let hashed = ''
    while (hashed.length < _metadata.passwordLength) {
      hashable += getHashable(_metadata)
      hashed += filter(_wordArrayToString(hash(hashable)))
    }
    hashed = hashed.slice(0, _metadata.passwordLength)

    return postProcess ? postProcess(hashed) : hashed
  }
}

function PasswordMetaData () {
  this.masterPassword = ''
  this.keyword = ''
  this.legacy = true
  this.includeNumbers = true
  this.includeSymbols = true
  this.illegalChars = ''
  this.passwordLength = 24
  this.notes = ''
}

const _generateLegacyPassword = (() => {
  function hash (value) {
    return MD5(value)
  }

  function getHashable (metadata) {
    return metadata.masterPassword + 'pemisah' + metadata.keyword
  }

  const SymbolString = '.,?!_/@#$%&*'

  return _createGenerator(getHashable, hash, SymbolString)
})()

const _generateStandardPassword = (() => {
  function hash (value) {
    return SHA256(value)
  }

  function getHashable (metadata) {
    return 'saltydog' + metadata.masterPassword + metadata.keyword
  }

  function ensureValidity (password) {
    return password
  }

  const SymbolString = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

  return _createGenerator(getHashable, hash, SymbolString, ensureValidity)
})()

const generatePassword = (metadata) => (metadata.legacy) ? _generateLegacyPassword(metadata) : _generateStandardPassword(metadata)

export const PasswordGenerator = {
  VerificationError,
  PasswordMetaData,
  generatePassword
}
