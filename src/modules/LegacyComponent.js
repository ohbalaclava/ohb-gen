const m = require('mithril')

function LegacyComponent (initialVnode) {
  let visible = false

  function toggleVisible (e) {
    visible = !visible
  }

  function CheckboxComponent (initialVnode) {
    return {
      view: (vnode) => {
        if (visible) {
          return (
            <div class={`${(visible) ? 'border-gray-300 rounded-md rounded-b-none border border-dashed border-b-0 p-2' : ''} flex items-start mb-2`}>
              <div class='flex items-center h-5'>
                <input
                  id='legacy'
                  name='legacy'
                  type='checkbox'
                  class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                  checked={vnode.attrs.checked}
                  oninput={vnode.attrs.setter}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='legacy' class='font-medium text-gray-700'>legacy</label>
                <p class='text-gray-500'>Use the Infinite Password method to generate the password. <em>Not recommended.</em></p>
              </div>
            </div>
          )
        }
      }
    }
  }

  return {
    view: (vnode) => {
      return (
        <div class='mt-2'>
          <CheckboxComponent checked={vnode.attrs.checked} setter={vnode.attrs.setter} />
          <button class='w-full transition-colors duration-500 bg-gray-50 hover:bg-gray-100 focus:outline-none cursor-pointer' onclick={toggleVisible}>{(visible) ? '\u2303' : '\u2304'}</button>
        </div>
      )
    }
  }
}

export { LegacyComponent }
