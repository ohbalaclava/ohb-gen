const m = require('mithril')

function ValidationMessage (initialVnode) {
  const icon = (isValid) => {
    if (isValid) {
      return <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' />
    } else {
      return <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
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
        return (
          <div class={`${classes(isValid)} flex items-center mt-2 justify-center`}>
            <svg class='inline-flex w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {icon(isValid)}
            </svg>
            <span class='font-bold text-sm uppercase'>{vnode.attrs.validationHint}</span>
          </div>
        )
      } else {
        return <div />
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
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='master-password' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-pink-600 bg-yellow-400 text-gray-900 text-sm font-bold'>
              MASTER PASSWORD
            </label>
            <input
              type='text'
              name='master-password'
              id='master-password'
              class={`${classes(empty, vnode.attrs.valid)} semi-obscured focus:ring-gray-100 focus:border-gray-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-pink-600`}
              oninput={e => vnode.attrs.setter(e.target.value)}
              value={vnode.attrs.value}
            />
          </div>
          <ValidationMessage empty={empty} valid={vnode.attrs.valid} validationHint={vnode.attrs.validationHint} />
          <span class='guide'>
            <div>
              Your master password must contain at least one lowercase letter, one uppercase letter, one number and one symbol
            </div>
          </span>
        </div>
      )
    }
  }
}

export { MasterPasswordComponent }
