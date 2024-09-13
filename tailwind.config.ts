import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0097e6',
        'body-bg': '#f8f9fa',
        'box-bg': '#ffffff',
        'logout-red': '#ff4757',
        background: '#f9f9f9',
      },
      boxShadow: {
        'custom-light': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
