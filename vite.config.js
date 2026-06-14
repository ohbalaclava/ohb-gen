import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
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