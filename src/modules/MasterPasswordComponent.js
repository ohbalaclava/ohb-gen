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
  const classes = (isEmpty, isValid) => {
    if (isEmpty) {
      return 'bg-white'
    } else if (isValid) {
      return 'bg-green-50'
    } else {
      return 'bg-red-50'
    }
  }

  return {
    view: (vnode) => {
      const empty = vnode.attrs.value.length === 0
      return m('div', { class: 'has-guide' }, [
        m('div', { class: 'mt-1 flex rounded-md shadow-sm' }, [
          m('label', { for: 'master-password', class: 'inline-flex items-center px-3 rounded-l-md border border-r-0 border-pink-600 bg-yellow-400 text-gray-900 text-sm font-bold' }, 'MASTER PASSWORD'),
          m('input', {
            type: 'text',
            name: 'master-password',
            id: 'master-password',
            class: `${classes(empty, vnode.attrs.valid)} semi-obscured focus:ring-gray-100 focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-pink-600`,
            oninput: e => vnode.attrs.setter(e.target.value),
            value: vnode.attrs.value
          })
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