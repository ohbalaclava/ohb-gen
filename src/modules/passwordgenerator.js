import { SHA256 } from 'crypto-es/lib/sha256'
import { MD5 } from 'crypto-es/lib/md5'

class VerificationError extends Error {
  constructor (message) {
    super(`Password verification error: ${message}`)
    this.name = this.constructor.name
  }
}

const PasswordGenerator = (function () {
  let _data

  const _createGenerator = (getHashable, hash, symbolString, postProcess) => {
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
      return _data.illegalChars.indexOf(character) >= 0
    }

    function isValidCharacter (character) {
      return (isLetter(character) || (_data.includeNumbers && isDigit(character)) || (_data.includeSymbols && isValidSymbol(character))) && !isIllegalCharacter(character)
    }

    function filter (value) {
      return [...value].filter(isValidCharacter).join('')
    }

    return (data) => {
      _data = data

      _verifyData(_data)

      let hashable = ''
      let hashed = ''
      while (hashed.length < _data.passwordLength) {
        hashable += getHashable(_data)
        hashed += filter(_wordArrayToString(hash(hashable)))
      }
      hashed = hashed.slice(0, _data.passwordLength)

      return postProcess ? postProcess(hashed) : hashed
    }
  }

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

  const _verifyData = (data) => {
    _assert(data !== undefined, 'password data is undefined')
    _assert(data.masterPassword, 'the master password is empty')
    _assert(data.keyword, 'the keyword is empty')
  }

  const _generateLegacyPassword = (() => {
    function hash (value) {
      return MD5(value)
    }

    function getHashable (data) {
      return data.masterPassword + 'pemisah' + data.keyword
    }

    const SymbolString = '.,?!_/@#$%&*'

    return _createGenerator(getHashable, hash, SymbolString)
  })()

  const _generateStandardPassword = (() => {
    function hash (value) {
      return SHA256(value)
    }

    function getHashable (data) {
      return 'saltydog' + data.masterPassword + data.keyword
    }

    const SymbolString = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

    return _createGenerator(getHashable, hash, SymbolString)
  })()

  const generatePassword = (data) => (data.legacy) ? _generateLegacyPassword(data) : _generateStandardPassword(data)

  return {
    newData,
    generatePassword
  }
})()

export { PasswordGenerator, VerificationError }
