const m = require('mithril')

const HAVE_CLIPBOARD_ACCESS = navigator.clipboard && navigator.clipboard.writeText

function PasswordDisplayComponent (initialVnode) {
  let _showCopiedMessage = false

  const copyToClipboard = async (text) => {
    if (HAVE_CLIPBOARD_ACCESS) {
      await navigator.clipboard.writeText(text)
    }
    _showCopiedMessage = true
    setTimeout(() => {
      _showCopiedMessage = false
      m.redraw()
    }, 3000)
  }

  return {
    view: (vnode) => {
      if (_showCopiedMessage) {
        return (
          <div class='mt-1 flex rounded-md shadow-sm'>
            <div id='copied-password' class='bg-gray-700 flex-1 w-full h-7 items-center justify-center inline-flex sm:text-sm border-gray-300 px-3 rounded-md border text-gray-50 text-sm'>
              COPIED
            </div>
          </div>
        )
      } else if (HAVE_CLIPBOARD_ACCESS) {
        return (
          <div class='mt-1 flex rounded-md shadow-sm'>
            <div id='generated-password' class='select-none semi-obscured z-10 focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-200 flex-1 w-full sm:text-sm border-gray-300 inline-flex items-center px-3 rounded-l-md border text-gray-500 text-sm'>
              {vnode.attrs.value}
            </div>
            <button
              class='w-6 z-0 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-200 focus:outline-none cursor-pointer'
              onclick={e => copyToClipboard(vnode.attrs.value)}
              disabled={vnode.attrs.value.length === 0}
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
        )
      } else {
        return (
          <div class='mt-1 flex rounded-md shadow-sm'>
            <div id='generated-password' class='semi-obscured focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-200 flex-1 w-full h-8 sm:text-sm border-gray-300 inline-flex items-center px-3 rounded-md border text-gray-500 text-sm'>
              {vnode.attrs.value}
            </div>
          </div>
        )
      }
    }
  }
}
function GeneratedPasswordComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div class='text-center'>
          <label for='generated-password' class='text-base font-medium text-gray-700'>
            Generated Password
          </label>
          <PasswordDisplayComponent value={vnode.attrs.value} />
        </div>
      )
    }
  }
}

export { GeneratedPasswordComponent }
