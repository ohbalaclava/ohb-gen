import sha256 from 'crypto-es/lib/sha256'

const model = (function () {
  const _data = {
    masterPassword: '',
    keyword: '',
    legacy: true,
    includeNumbers: true,
    includeSymbols: true,
    illegalChars: '',
    passwordLength: 24,
    notes: ''
  }
  const _generatedPassword = 'XXX test XXX'

  const getMasterPassword = () => _data.masterPassword

  const setMasterPassword = masterPassword => { _data.masterPassword = masterPassword }

  const getKeyword = () => _data.keyword

  const setKeyword = keyword => { _data.keyword = keyword }

  const getLegacy = () => _data.legacy

  const setLegacy = legacy => { _data.legacy = legacy }

  const getNotes = () => _data.notes

  const setNotes = notes => { _data.notes = notes }

  const getIncludeNumbers = () => _data.includeNumbers

  const setIncludeNumbers = includeNumbers => { _data.includeNumbers = includeNumbers }

  const getIncludeSymbols = () => _data.includeSymbols

  const setIncludeSymbols = includeSymbols => { _data.includeSymbols = includeSymbols }

  const getIllegalChars = () => _data.illegalChars

  const setIllegalChars = illegalChars => { _data.illegalChars = illegalChars }

  const incrementPasswordLength = () => _data.passwordLength++

  const decrementPasswordLength = () => _data.passwordLength--

  const getPasswordLength = () => _data.passwordLength

  const setPasswordLength = passwordLength => { _data.passwordLength = passwordLength }

  const getGeneratedPassword = () => _generatedPassword

  const copyToClipboard = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(_generatedPassword)
    }
  }

  const save = () => {}

  return {
    getMasterPassword,
    setMasterPassword,
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
    getIllegalChars,
    setIllegalChars,
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
