const m = require('mithril')

function TitleComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div>
          <div class='flex flex-row items-center justify-center'>
            <hr class='border-yellow-700 w-full' />
            <h1 class='text-md text-gray-900 font-extrabold mx-2'>{vnode.attrs.title}</h1>
            <hr class='border-yellow-700 w-full' />
          </div>
        </div>
      )
    }
  }
}

export { TitleComponent }
