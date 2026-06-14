import m from 'mithril'

function KeywordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-pink-600 bg-yellow-400 text-gray-900 text-sm font-bold'>
              APP/SITE
            </label>
            <input
              type='text'
              autocomplete='off'
              list='keywords'
              name='keyword' id='keyword'
              class='focus:ring-gray-100 focus:border-gray-500 flex-1 block w-full rounded-r-md sm:text-sm border-pink-600'
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
