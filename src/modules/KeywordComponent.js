const m = require('mithril')

function KeywordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              App/Site
            </label>
            <input
              type='text'
              autocomplete='off'
              list='keywords'
              name='keyword' id='keyword'
              class='z-10 focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300'
              oninput={vnode.attrs.setter}
            />
            <button
              class='w-6 z-0 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer'
              onclick={vnode.attrs.saveFunction}
            >
              <svg class='mx-1 text-gray-500' viewBox='0 0 64 64'>
                <g>
                  <path d='m49 3h-42a4 4 0 0 0 -4 4v50a4 4 0 0 0 4 4h50a4 4 0 0 0 4-4v-46l-8-8z' fill='white' />
                  <path d='m49 3v17a2.006 2.006 0 0 1 -2 2h-30a2.006 2.006 0 0 1 -2-2v-17z' fill='white' />
                  <path d='m35 7h6v11h-6z' fill='white' />
                  <path d='m51 31h-38a4 4 0 0 0 -4 4v26h46v-26a4 4 0 0 0 -4-4z' fill='white' />
                  <path d='m3 56v1a4 4 0 0 0 4 4h2v-5z' fill='lightgray' />
                  <path d='m55 5v56h2a4 4 0 0 0 4-4v-46z' fill='lightgray' />
                  <path d='m47 56h-38v5h46v-13a8 8 0 0 1 -8 8z' fill='lightgray' />
                  <g fill='currentColor'>
                    <path d='m61.707 10.293-8-8a1 1 0 0 0 -.707-.293h-46a5.006 5.006 0 0 0 -5 5v50a5.006 5.006 0 0 0 5 5h50a5.006 5.006 0 0 0 5-5v-46a1 1 0 0 0 -.293-.707zm-13.707-6.293v16a1 1 0 0 1 -1 1h-30a1 1 0 0 1 -1-1v-16zm-38 56v-25a3 3 0 0 1 3-3h38a3 3 0 0 1 3 3v25zm50-3a3 3 0 0 1 -3 3h-1v-25a5.006 5.006 0 0 0 -5-5h-38a5.006 5.006 0 0 0 -5 5v25h-1a3 3 0 0 1 -3-3v-50a3 3 0 0 1 3-3h7v16a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-16h2.586l7.414 7.414z' />
                    <path d='m35 19h6a1 1 0 0 0 1-1v-11a1 1 0 0 0 -1-1h-6a1 1 0 0 0 -1 1v11a1 1 0 0 0 1 1zm1-11h4v9h-4z' />
                    <path d='m47 45h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                    <path d='m47 39h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                    <path d='m47 51h-30a1 1 0 0 0 0 2h30a1 1 0 0 0 0-2z' />
                  </g>
                </g>
              </svg>
            </button>
            <datalist id='keywords' />
          </div>
          <div class='guide justify-start mt-1 ml-4 p-1'>
            <div class='text-gray-500 text-sm'>
              The name of the app/site you want to generate a password for. This may be a word, a sentence, a URI, etc. It will be combined with the master password to generate a new unique password for this app/site
            </div>
          </div>
        </div>
      )
    }
  }
}

export { KeywordComponent }
