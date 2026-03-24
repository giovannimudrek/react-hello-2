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
        'bg-page': '#F4F5F7',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        border: '#E8EAED',
        tag: {
          'red-bg': '#FEF3F2',
          'red-text': '#D92D20',
          'yellow-bg': '#FFF7ED',
          'yellow-text': '#DC6803',
          'green-bg': '#ECFDF3',
          'green-text': '#039855',
        },
      },
    },
  },
  plugins: [],
};
