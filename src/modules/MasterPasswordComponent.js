import m from 'mithril'

function ValidationMessage (initialVnode) {
  const icon = (isValid) => {
    if (isValid) {
      return m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })
    } else {
      return m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M6 18L18 6M6 6l12 12' })
    }
  }

  const classes = (isValid) => {
    if (isValid) {
      return 'text-green-700'
    } else {
      return 'text-red-700'
    }
  }

  return {
    view: (vnode) => {
      const isValid = vnode.attrs.valid
      if (!vnode.attrs.empty && vnode.attrs.validationHint) {
        return m('div', { class: `${classes(isValid)} flex items-center mt-2 justify-center` }, [
          m('svg', { class: 'inline-flex w-4 h-4', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            icon(isValid)
          ]),
          m('span', { class: 'font-bold text-sm uppercase' }, vnode.attrs.validationHint)
        ])
      } else {
        return m('div')
      }
    }
  }
}

function MasterPasswordComponent (initialVnode) {
  let revealed = false

  const classes = (isEmpty, isValid) => {
    if (isEmpty) {
      return 'bg-white'
    } else if (isValid) {
      return 'bg-green-50'
    } else {
      return 'bg-red-50'
    }
  }

  const eyeIcon = () => {
    if (revealed) {
      return [
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 9c-2.4 3-5.4 4.5-9 4.5S5.4 12 3 9' }),
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 15l2.5-3.8' }),
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 15l-2.5-3.8' }),
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 17l.5-4' }),
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 17l-.5-4' })
      ]
    } else {
      return [
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
        m('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
      ]
    }
  }

  return {
    view: (vnode) => {
      const empty = vnode.attrs.value.length === 0
      return m('div', { class: 'has-guide' }, [
        m('div', { class: 'mt-1 flex rounded-md shadow-sm' }, [
          m('label', { for: 'master-password', class: 'inline-flex items-center px-3 rounded-l-md border border-r-0 border-pink-600 bg-yellow-400 text-gray-900 text-sm font-bold' }, 'MASTER PASSWORD'),
          m('input', {
            type: revealed ? 'text' : 'password',
            name: 'master-password',
            id: 'master-password',
            autocomplete: 'off',
            class: `${classes(empty, vnode.attrs.valid)} focus:ring-gray-100 focus:border-gray-500 flex-1 block w-full rounded-none sm:text-sm border-pink-600`,
            oninput: e => vnode.attrs.setter(e.target.value),
            value: vnode.attrs.value
          }),
          m('button', {
            type: 'button',
            title: revealed ? 'Hide password' : 'Show password',
            'aria-label': revealed ? 'Hide password' : 'Show password',
            class: 'w-8 inline-flex items-center justify-center rounded-r-md border border-l-0 border-pink-600 bg-yellow-400 hover:bg-yellow-200 focus:outline-none cursor-pointer',
            onclick: () => { revealed = !revealed }
          }, [
            m('svg', { class: 'w-4 h-4 text-gray-900', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, eyeIcon())
          ])
        ]),
        m(ValidationMessage, { empty: empty, valid: vnode.attrs.valid, validationHint: vnode.attrs.validationHint }),
        m('span', { class: 'guide' }, [
          m('div', 'Your master password must contain at least one lowercase letter, one uppercase letter, one number and one symbol')
        ])
      ])
    }
  }
}

export { MasterPasswordComponent }