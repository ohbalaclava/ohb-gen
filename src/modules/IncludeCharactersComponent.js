const m = require('mithril')

function IncludeCharactersComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <fieldset>
          <legend class='text-base font-medium text-gray-900'>Include</legend>
          <div class='ml-4 mt-2 space-y-4'>
            <div class='flex items-start'>
              <div class='flex items-center h-5'>
                <input
                  id='numbers'
                  name='numbers'
                  type='checkbox'
                  class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                  checked={vnode.attrs.includeNumbers}
                  oninput={e => vnode.attrs.includeNumbersSetter(e.target.checked)}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='numbers' class='font-medium text-gray-900'>numbers</label>
                <p class='text-gray-500'>The generated password will contain at least one number.</p>
              </div>
            </div>
            <div class='flex items-start'>
              <div class='flex items-center h-5'>
                <input
                  id='symbols'
                  name='symbols'
                  type='checkbox'
                  class='focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-300 rounded'
                  checked={vnode.attrs.includeSymbols}
                  oninput={e => vnode.attrs.includeSymbolsSetter(e.target.checked)}
                />
              </div>
              <div class='ml-3 text-sm'>
                <label for='symbols' class='font-medium text-gray-900'>symbols</label>
                <p class='text-gray-500'>The generated password will contain at least one symbol.</p>
              </div>
            </div>
          </div>
        </fieldset>
      )
    }
  }
}

export { IncludeCharactersComponent }
