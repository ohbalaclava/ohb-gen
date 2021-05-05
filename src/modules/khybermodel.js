import sha256 from 'crypto-es/lib/sha256'

const model = (function () {
  let _masterPassword = ''
  let _keyword = ''
  let _includeNumbers = true
  let _includeSymbols = true
  let _illegalChars = ''
  let _passwordLength = 24
  let _notes = ''

  const getMasterPassword = () => _masterPassword

  const setMasterPassword = masterPassword => { _masterPassword = masterPassword }

  const getKeyword = () => _keyword

  const setKeyword = keyword => { _keyword = keyword }

  const getNotes = () => _notes

  const setNotes = notes => { _notes = notes }

  const getIncludeNumbers = () => _includeNumbers

  const setIncludeNumbers = includeNumbers => { _includeNumbers = includeNumbers }

  const getIncludeSymbols = () => _includeSymbols

  const setIncludeSymbols = includeSymbols => { _includeSymbols = includeSymbols }

  const getIllegalChars = () => _illegalChars

  const setIllegalChars = illegalChars => { _illegalChars = illegalChars }

  const incrementPasswordLength = () => _passwordLength++

  const decrementPasswordLength = () => _passwordLength--

  const getPasswordLength = () => _passwordLength

  const setPasswordLength = passwordLength => { _passwordLength = passwordLength }

  return {
    getMasterPassword,
    setMasterPassword,
    getKeyword,
    setKeyword,
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
    decrementPasswordLength
  }
})()

export { model as default }
