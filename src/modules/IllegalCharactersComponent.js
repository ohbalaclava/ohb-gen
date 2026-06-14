import m from 'mithril'

function IllegalCharactersComponent (initialVnode) {
  return {
    view: (vnode) =>
      m('div', { class: 'has-guide' }, [
        m('div', { class: 'mt-1 flex rounded-md shadow-sm' }, [
          m('label', { for: 'contains-not', class: 'inline-flex items-center px-3 rounded-l-md border border-r-0 border-pink-600 bg-yellow-400 text-gray-900 text-sm font-bold' }, 'ILLEGAL CHARACTERS'),
          m('input', {
            type: 'text',
            name: 'contains-not',
            id: 'contains-not',
            placeholder: 'e.g. $%£!...',
            class: 'focus:ring-gray-100 focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-pink-600',
            oninput: e => vnode.attrs.setter(e.target.value)
          })
        ]),
        m('span', { class: 'guide' }, 'If there are any characters the password must not contain then list them here')
      ])
  }
}

export { IllegalCharactersComponent }