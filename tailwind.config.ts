import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/utilities/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        norms: ['var(--font-norms)', 'sans-serif'],
      },
    },
  },
}

export default config
