/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import path, { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: [
      {
        find: '~/src',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    lib: {
      entry: {
        Button: resolve(__dirname, 'src/components/atoms/Button/Button.tsx'),
        Card: resolve(__dirname, 'src/components/atoms/Card/Card.tsx'),
      },
      name: 'AlareisDesignSystem',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@alareis/styled-system'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
