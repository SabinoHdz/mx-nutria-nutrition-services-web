import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // Disable predefined themes, use custom CSS variables
    styled: true,
    base: true,
    utils: true,
  },
};

export default config;
