// tailwind.config.ts
import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // controlas el dark con la clase .dark en <html>
  theme: {
    // Sin clases personalizadas, solo DaisyUI
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
}

export default config
