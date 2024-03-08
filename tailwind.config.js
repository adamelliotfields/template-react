import containerQueriesPlugin from '@tailwindcss/container-queries'
import headlessuiPlugin from '@headlessui/tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import typographyPlugin from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [containerQueriesPlugin, formsPlugin, headlessuiPlugin, typographyPlugin],
  theme: { extend: {} }
}

export default config
