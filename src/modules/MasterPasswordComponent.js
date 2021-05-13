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
      return 'text-green-500'
    } else {
      return 'text-red-500'
    }
  }

  return {
    view: (vnode) => {
      const isValid = vnode.attrs.valid
      if (!vnode.attrs.empty) {
        return (
          <div class={`${classes(isValid)} flex items-center`}>
            <svg class='inline-flex w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {icon(isValid)}
            </svg>
            <span class='font-medium text-sm ml-1'>{vnode.attrs.validationHint}</span>
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
      return (
        <div class='has-guide'>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='master-password' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Master Password
            </label>
            <input
              type='text'
              name='master-password'
              id='master-password'
              class={`${classes(vnode.attrs.empty, vnode.attrs.valid)} semi-obscured focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300`}
              oninput={vnode.attrs.setFunction}
            />
          </div>
          <div class='guide justify-start mt-1 ml-4 p-1'>
            <ValidationMessage empty={vnode.attrs.empty} valid={vnode.attrs.valid} validationHint={vnode.attrs.validationHint} />
            <div class='text-gray-500 text-sm'>
              Your master password must contain at least one lowercase letter, one uppercase letter, one number and one symbol
            </div>
          </div>
        </div>
      )
    }
  }
}

export { MasterPasswordComponent }
