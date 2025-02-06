import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  include: [
    '../../libs/design-system/src/**/*.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  importMap: '@alareis/styled-system',
  outdir: 'styled-system',
})
