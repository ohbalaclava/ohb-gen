const m = require('mithril')

function TitleComponent (initialVnode) {
  return {
    view: (vnode) => {
      return (
        <div>
          <hr class='border-yellow-700 w-full' />
          <div class='flex flex-row items-center justify-center'>
            <hr class='border-yellow-700 w-full' />
            <h1 class='text-md text-gray-300 font-extrabold mx-2'>{vnode.attrs.title}</h1>
            <hr class='border-yellow-700 w-full' />
          </div>
          <hr class='border-yellow-700 w-full' />
        </div>
      )
    }
  }
}

export { TitleComponent }
