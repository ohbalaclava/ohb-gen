const m = require('mithril')

function KeywordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-yellow-100 text-blue-900 text-sm'>
              App/Site
            </label>
            <input
              type='text'
              autocomplete='off'
              list='keywords'
              name='keyword' id='keyword'
              class='focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-r-md sm:text-sm border-gray-300'
              oninput={e => vnode.attrs.setter(e.target.value)}
            />
            <datalist id='keywords' />
          </div>
          <span class='guide'>
            The name of the app/site you want to generate a password for. This may be a word, a sentence, a URI, etc. It will be combined with the master password to generate a new unique password for this app/site
          </span>
        </div>
      )
    }
  }
}

export { KeywordComponent }
