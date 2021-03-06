import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'jenga-ui',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'tastycss',
        'tastycss-react',
        '@jenga-ui/core',
        '@jenga-ui/atoms',
      ],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
