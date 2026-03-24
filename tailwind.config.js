/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#7F56D9',
          light: '#F4EBFF',
          dark: '#6941C6',
        },
        surface: '#FFFFFF',
        'bg-page': '#F5F5F5',
        'text-primary': '#0A0D12',
        'text-secondary': '#414651',
        'text-tertiary': '#717680',
        border: '#E9EAEB',
        'border-secondary': '#D5D7DA',
        tag: {
          'red-bg': '#FEF3F2',
          'red-text': '#D92D20',
          'yellow-bg': '#FFFAEB',
          'yellow-text': '#DC6803',
          'green-bg': '#ECFDF3',
          'green-text': '#039855',
        },
      },
    },
  },
  plugins: [],
};
