import { defineConfig } from 'vite'
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({
    rollupTypes: true,
  }), react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MTRGenTemplateEditor',
      fileName: `mtrgen-template-editor`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react-bootstrap', 'uuid', 'react-syntax-highlighter', 'usehooks-ts'],
      output: {
        dir: 'dist',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        intro: `/* MTRGen Template Editor React component, Matronator © 2023 */`,
        outro: '/* https://matronator.com */',
        preserveModulesRoot: 'src',
      },
    },
  }
})
