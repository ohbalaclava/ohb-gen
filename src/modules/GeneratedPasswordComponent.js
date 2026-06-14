import m from 'mithril'

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
            <div id='copied-password' class='flex-1 w-full h-7 items-center justify-center inline-flex sm:text-sm border-gray-300 px-3 rounded-md border bg-yellow-400 text-gray-900 text-sm font-bold'>
              COPIED
            </div>
          </div>
        )
      } else if (HAVE_CLIPBOARD_ACCESS) {
        return (
          <div class='mt-1 flex rounded-md shadow-sm'>
            <div id='generated-password' class='select-none semi-obscured z-10 bg-teal-300 flex-1 w-full border-pink-600 inline-flex items-center px-3 rounded-l-md border text-sm justify-center'>
              {vnode.attrs.value}
            </div>
            <button
              class='w-6 z-0 transition-colors duration-500 inline-flex items-center rounded-r-md border border-l-0 border-pink-600 bg-yellow-400 hover:bg-yellow-200 focus:outline-none cursor-pointer'
              onclick={e => copyToClipboard(vnode.attrs.value)}
              disabled={vnode.attrs.value.length === 0}
            >
              <svg
                viewBox='0 0 29 39'
                class='text-gray-900 m-1'
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
            <div id='generated-password' class='semi-obscured focus:ring-gray-100 focus:border-gray-500 bg-yellow-200 flex-1 w-full h-8 border-pink-600 inline-flex items-center px-3 rounded-md border text-gray-100 text-sm'>
              {vnode.attrs.value}
            </div>
          </div>
        )
      }
    }
  }
}

function ResetProgressComponent (initialVnode) {
  let _hidden = true
  return {
    view: (vnode) => {
      if (vnode.attrs.reset) {
        _hidden = !_hidden
        if (_hidden) {
          Promise.resolve().then(() => {
            m.redraw()
          })
        }
        const resetTime = parseInt(vnode.attrs.reset, 10) / 1000
        return (
          <div class={`${_hidden ? 'countdown-empty' : 'countdown'}`} style={`--duration: ${resetTime};`}>
            <div />
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
          <PasswordDisplayComponent value={vnode.attrs.value} />
          <ResetProgressComponent reset={vnode.attrs.reset} />
        </div>
      )
    }
  }
}

export { GeneratedPasswordComponent }
