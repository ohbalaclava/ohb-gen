const m = require('mithril')

function GeneratedPasswordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div>
          <label for='generated-password' class='text-base font-medium text-gray-900'>
            Generated Password
          </label>
          <div class='mt-1 flex rounded-md shadow-sm'>
            <div id='generated-password' class='select-none semi-obscured z-10 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-200 flex-1 w-full sm:text-sm border-gray-300 inline-flex items-center px-3 rounded-l-md border text-gray-500 text-sm'>
              {vnode.attrs.getter}
            </div>
            <button
              class='w-6 z-0 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer'
              onclick={vnode.attrs.copyFunction}
            >
              <svg
                viewBox='0 0 29 39'
                class='text-gray-400 m-1'
                preserveAspectRatio='xMidYMid meet'
                stroke='currentColor'
                fill='#ffffff'
              >
                <rect height='34' id='back_rect' stroke-width='2' width='24' x='4' y='1' />
                <rect height='34' id='front_rect' stroke-width='2' width='24' x='1' y='4' />
              </svg>
            </button>
          </div>
        </div>
      )
    }
  }
}

export { GeneratedPasswordComponent }
