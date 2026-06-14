import m from 'mithril'

function NotesComponent (initialVnode) {
  return {
    view: (vnode) =>
      m('div', { class: 'has-guide' }, [
        m('div', { class: 'mt-1 flex rounded-md shadow-sm' }, [
          m('label', { for: 'keyword', class: 'inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm' }, 'Notes'),
          m('textarea', {
            id: 'notes',
            name: 'notes',
            rows: '3',
            class: 'shadow-sm focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300',
            oninput: e => vnode.attrs.setter(e.target.value)
          })
        ]),
        m('span', { class: 'guide' }, 'Any notes or information you wish to save for this app/site, for example a username')
      ])
  }
}

export { NotesComponent }