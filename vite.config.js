import { defineConfig } from 'vite'

export default defineConfig({
  // The source uses JSX inside plain .js files with Mithril's `m` pragma,
  // so tell esbuild to treat those files as JSX.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
    jsxFactory: 'm',
    jsxFragment: "'['"
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  server: {
    port: 9000,
    open: true
  },
  build: {
    outDir: 'dist'
  }
})