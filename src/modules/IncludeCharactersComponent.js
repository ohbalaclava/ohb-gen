const m = require('mithril')

function IncludeCharactersComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <fieldset>
          <legend class='text-base font-bold text-gray-900'>INCLUDE</legend>
          <div class='ml-4 mt-2 space-y-4'>
            <div class='flex items-start'>
              <div class='flex items-center h-5'>
                <input
                  id='numbers'
                  name='numbers'
                  type='checkbox'
                  class='focus:ring-pink-300 h-4 w-4 text-teal-400 border-pink-600 rounded'
                  checked={vnode.attrs.includeNumbers}
                  oninput={e => vnode.attrs.includeNumbersSetter(e.target.checked)}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='numbers' class='font-bold text-gray-900'>NUMBERS</label>
                <p class='text-gray-700'>The generated password will contain at least one number.</p>
              </div>
            </div>
            <div class='flex items-start'>
              <div class='flex items-center h-5'>
                <input
                  id='symbols'
                  name='symbols'
                  type='checkbox'
                  class='focus:ring-pink-300 h-4 w-4 text-teal-400 border-pink-600 rounded'
                  checked={vnode.attrs.includeSymbols}
                  oninput={e => vnode.attrs.includeSymbolsSetter(e.target.checked)}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='symbols' class='font-bold text-gray-900'>SYMBOLS</label>
                <p class='text-gray-700'>The generated password will contain at least one symbol.</p>
              </div>
            </div>
          </div>
        </fieldset>
      )
    }
  }
}

export { IncludeCharactersComponent }
