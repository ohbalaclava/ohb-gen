const m = require('mithril')

function LegacyComponent (initialVnode) {
  let _open = false
  let _infinite = false
  let _checked = false
  let _setter = null

  function toggleOpen (e) {
    _open = !_open
  }

  function CheckboxComponent (initialVnode) {
    return {
      view: (vnode) => {
        const _visible = _open || _checked || _infinite
        if (_visible) {
          return (
            <div class={`${_visible && !_infinite ? 'border-gray-300 rounded-md rounded-b-none border border-dashed border-b-0 p-2' : ''} flex items-start`}>
              <div class='flex items-center h-5'>
                <input
                  id='legacy'
                  name='legacy'
                  type='checkbox'
                  class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                  checked={_checked}
                  oninput={e => _setter(e.target.checked)}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='legacy' class='font-medium text-gray-700'>legacy</label>
                <p class='text-gray-500'>For users of Infinite Password Generator only. Use the IPG algorithm to generate the password.</p>
              </div>
            </div>
          )
        }
      }
    }
  }

  function ShowHideButtonComponent (initialVnode) {
    function getVariableButtonClasses () {
      if (_checked) {
        return 'bg-gray-300 cursor-auto'
      } else {
        return 'bg-gradient-to-b from-yellow-300 to-yellow-600 opacity-60 cursor-pointer'
      }
    }

    return {
      view: (vnode) => {
        if (!_infinite) {
          return (
            <button
              class={`${getVariableButtonClasses()} w-full transition-colors duration-500 focus:outline-none`}
              onclick={toggleOpen}
              disabled={_checked}
            >
              {_open ? '\u2303' : '\u2304'}
            </button>
          )
        }
      }
    }
  }

  return {
    view: (vnode) => {
      _infinite = vnode.attrs.infinite === 'true'
      _checked = vnode.attrs.checked
      _setter = vnode.attrs.setter

      return (
        <div class='mt-2'>
          <CheckboxComponent />
          <ShowHideButtonComponent />
        </div>
      )
    }
  }
}

export { LegacyComponent }
