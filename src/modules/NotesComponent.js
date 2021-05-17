const m = require('mithril')

function NotesComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='keyword' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Notes
            </label>
            <textarea
              id='notes'
              name='notes'
              rows='3'
              class='shadow-sm focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
              oninput={vnode.attrs.setter}
            />
          </div>
          <div class='guide justify-start mt-1 mx-2 p-1 text-gray-500 text-sm'>
            Any notes or information you wish to save for this app/site, for example a username
          </div>
        </div>
      )
    }
  }
}

export { NotesComponent }
