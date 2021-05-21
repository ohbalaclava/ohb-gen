const m = require('mithril')

const MAXIMUM_PASSWORD_LENGTH = 64
const INITIAL_PASSWORD_LENGTH = 24

function LengthComponent (initialVnode) {
  let _passwordLengthString = INITIAL_PASSWORD_LENGTH.toString(10)

  function _getParsedLength (length) {
    const parsedLength = parseInt(length, 10)
    return isNaN(parsedLength) ? 0 : parsedLength
  }

  function _increment (setter) {
    _setLength(_getParsedLength(_passwordLengthString) + 1, setter)
  }

  function _decrement (setter) {
    _setLength(_getParsedLength(_passwordLengthString) - 1, setter)
  }

  function _setLength (length, setter) {
    if (length > 0) {
      if (length <= MAXIMUM_PASSWORD_LENGTH) {
        _passwordLengthString = length.toString(10)
        setter(length)
      } else {
        _passwordLengthString = MAXIMUM_PASSWORD_LENGTH.toString(10)
        setter(MAXIMUM_PASSWORD_LENGTH)
      }
    } else {
      _passwordLengthString = ''
      setter(0)
    }
  }

  function _setLengthString (length, setter) {
    _setLength(_getParsedLength(length), setter)
  }

  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='flex items-center justify-evenly mt-1'>
            <label for='length' class='text-sm font-medium text-gray-900 absolute left-16'>
              Length
            </label>
            <div class='flex h-10 w-32 rounded-md relative'>
              <button
                class='z-0 font-semibold inline-flex items-center rounded-l-md border border-r-0 h-full w-20 border-gray-300 hover:bg-gray-100 text-blue-900 bg-yellow-100 text-sm focus:outline-none cursor-pointer'
                onclick={e => _decrement(vnode.attrs.setter)}
              >
                <span class='m-auto'>-</span>
              </button>
              <input
                type='number'
                id='length'
                value={_passwordLengthString}
                oninput={e => _setLengthString(e.target.value, vnode.attrs.setter)}
                step='1'
                class='z-10 text-center w-16 focus:ring-yellow-500 focus:border-yellow-500 border-gray-300 text-xs md:text-base flex items-center justify-center cursor-default'
              />
              <button
                class='z-0 font-semibold inline-flex items-center rounded-r-md border border-l-0 h-full w-20 border-gray-300 hover:bg-gray-100 text-blue-900 bg-yellow-100 text-sm focus:outline-none cursor-pointer'
                onclick={e => _increment(vnode.attrs.setter)}
              >
                <span class='m-auto'>+</span>
              </button>
            </div>
          </div>
          <span class='guide'>
            The length of password to generate, upto {MAXIMUM_PASSWORD_LENGTH} characters
          </span>
        </div>
      )
    }
  }
}

export { LengthComponent }
