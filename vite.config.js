import { defineConfig } from 'vite'

export default defineConfig({
  // JSX (in .jsx files) is compiled with Mithril's `m` pragma.
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'm',
    jsxFragment: "'['"
  },
  server: {
    port: 9000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})