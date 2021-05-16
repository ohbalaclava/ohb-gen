import { SHA256 } from 'crypto-es/lib/sha256'
import { MD5 } from 'crypto-es/lib/md5'
import { MersenneTwister } from './mersenne-twister'

class VerificationError extends Error {
  constructor (message) {
    super(`Password verification error: ${message}`)
    this.name = this.constructor.name
  }
}

const _createGenerator = (getHashable, hash, symbolString, postProcess) => {
  function _assert (booleanValue, message) {
    if (!booleanValue) {
      throw new VerificationError(message)
    }
  }

  function _verifyMetaData (metadata) {
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

  function _getLegalCharactersFilter (metadata) {
    let legalCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (metadata.includeNumbers) {
      legalCharacters += '0123456789'
    }
    if (metadata.includeSymbols) {
      legalCharacters += symbolString
    }
    if (metadata.illegalChars) {
      legalCharacters = legalCharacters.replace(new RegExp(`[${metadata.illegalChars}]`, 'g'), '')
    }
    _assert(legalCharacters.length > 0, 'there are no legal characters available to generate a password')

    return (value) => legalCharacters.indexOf(value) >= 0
  }

  function _filter (value, isLegalCharacter) {
    return [...value].filter(isLegalCharacter).join('')
  }

  return (metadata) => {
    _verifyMetaData(metadata)

    let hashable = ''
    let hashed = ''
    while (hashed.length < metadata.passwordLength) {
      hashable += getHashable(metadata)
      hashed += _filter(_wordArrayToString(hash(hashable)), _getLegalCharactersFilter(metadata))
    }
    hashed = hashed.slice(0, metadata.passwordLength)

    return postProcess ? postProcess(hashed, metadata) : hashed
  }
}

function PasswordMetaData () {
  this.masterPassword = ''
  this.keyword = ''
  this.legacy = false
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
  const prng = new MersenneTwister()
  const SymbolString = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'

  function hash (value) {
    return SHA256(value)
  }

  function getHashable (metadata) {
    return 'saltydog' + metadata.masterPassword + metadata.keyword
  }

  function ensureHasCharacter (password, characters, index) {
    const rx = new RegExp('[' + characters + ']')
    if (password.match(rx)) {
      return password
    }

    const characterIndex = prng.getRandomInt(0, characters.length)
    const character = characters.charAt(characterIndex)
    const passwordArray = [...password]
    passwordArray[index] = character

    return passwordArray.join('')
  }

  // Fisher-Yates (Knuth) shuffle
  function shuffle (array) {
    let unshuffledEnd = array.length

    // While there remain elements to shuffle…
    while (unshuffledEnd) {
      // Pick a remaining element…
      const randomIndex = Math.floor(prng.random() * unshuffledEnd--)

      // And swap it with the current element.
      const temp = array[unshuffledEnd]
      array[unshuffledEnd] = array[randomIndex]
      array[randomIndex] = temp
    }

    return array
  }

  function ensureValidity (password, metadata) {
    prng.init_seed(password.charCodeAt(0))

    if (metadata.includeNumbers) {
      password = ensureHasCharacter(password, '0123456789')
    }
    if (metadata.includeSymbols) {
      password = ensureHasCharacter(password, SymbolString)
    }

    return shuffle([...password]).join('')
  }

  return _createGenerator(getHashable, hash, SymbolString, ensureValidity)
})()

const generatePassword = (metadata) => (metadata.legacy) ? _generateLegacyPassword(metadata) : _generateStandardPassword(metadata)

export const PasswordGenerator = {
  VerificationError,
  PasswordMetaData,
  generatePassword
}
