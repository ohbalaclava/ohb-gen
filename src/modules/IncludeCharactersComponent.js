import m from 'mithril'

function IncludeCharactersComponent (initialVnode) {
  return {
    view: (vnode) =>
      m('fieldset', [
        m('legend', { class: 'text-base font-bold text-gray-900' }, 'INCLUDE'),
        m('div', { class: 'ml-4 mt-2 space-y-4' }, [
          m('div', { class: 'flex items-start' }, [
            m('div', { class: 'flex items-center h-5' }, [
              m('input', {
                id: 'numbers',
                name: 'numbers',
                type: 'checkbox',
                class: 'focus:ring-pink-300 h-4 w-4 text-teal-400 border-pink-600 rounded',
                checked: vnode.attrs.includeNumbers,
                oninput: e => vnode.attrs.includeNumbersSetter(e.target.checked)
              })
            ]),
            m('div', { class: 'ml-3 text-sm' }, [
              m('label', { for: 'numbers', class: 'font-bold text-gray-900' }, 'NUMBERS'),
              m('p', { class: 'text-gray-700' }, 'The generated password will contain at least one number.')
            ])
          ]),
          m('div', { class: 'flex items-start' }, [
            m('div', { class: 'flex items-center h-5' }, [
              m('input', {
                id: 'symbols',
                name: 'symbols',
                type: 'checkbox',
                class: 'focus:ring-pink-300 h-4 w-4 text-teal-400 border-pink-600 rounded',
                checked: vnode.attrs.includeSymbols,
                oninput: e => vnode.attrs.includeSymbolsSetter(e.target.checked)
              })
            ]),
            m('div', { class: 'ml-3 text-sm' }, [
              m('label', { for: 'symbols', class: 'font-bold text-gray-900' }, 'SYMBOLS'),
              m('p', { class: 'text-gray-700' }, 'The generated password will contain at least one symbol.')
            ])
          ])
        ])
      ])
  }
}

export { IncludeCharactersComponent }