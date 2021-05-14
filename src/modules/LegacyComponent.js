const m = require('mithril')

function LegacyComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='mt-2 flex items-start'>
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

export { LegacyComponent }