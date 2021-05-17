const m = require('mithril')

function IllegalCharactersComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='contains-not' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Illegal characters
            </label>
            <input
              type='text'
              name='contains-not'
              id='contains-not'
              placeholder='e.g. $%£!...'
              class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
              oninput={e => vnode.attrs.setter(e.target.value)}
            />
          </div>
          <div tabindex='0' class='guide justify-start mt-1 mx-2 p-1 text-gray-500 text-sm'>
            If there are any characters the password must not contain then list them here
          </div>
        </div>
      )
    }
  }
}

export { IllegalCharactersComponent }
