const m = require('mithril')

function ValidationIcon (initialVnode) {
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
      return (
        <svg class={`${classes(isValid)} w-4 h-4`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          {icon(isValid)}
        </svg>
      )
    }
  }
}

function MasterPasswordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <label for='master-password' class='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              Master Password
            </label>
            <input
              type='text'
              name='master-password'
              id='master-password'
              class='semi-obscured focus:ring-yellow-500 focus:border-yellow-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
              oninput={vnode.attrs.setFunction}
            />
          </div>
          <div class={`${(vnode.attrs.empty) ? 'hidden' : ''} flex items-center justify-start mt-1 ml-4 p-1`}>
            <div class='rounded-full p-1 fill-current'>
              <ValidationIcon valid={vnode.attrs.valid} />
            </div>
            <span class='font-medium text-sm ml-3' />
          </div>
        </div>
      )
    }
  }
}

export { MasterPasswordComponent }
