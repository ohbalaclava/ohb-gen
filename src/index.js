const m = require('mithril')

function MyComponent () {
  return {
    view: () => (
      <main>
        <h1>Hello world</h1>
      </main>
    )
  }
}

m.mount(document.body, MyComponent)
