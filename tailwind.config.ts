// tailwind.config.ts or tailwind.config.js

import type { Config } from 'tailwindcss';
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

const config: Config = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // ✅ Add this for Flowbite
    './node_modules/flowbite/**/*.js',
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [// ✅ Add this to enable Flowbite components
  require('flowbite/plugin'), flowbiteReact],
};

export default config;