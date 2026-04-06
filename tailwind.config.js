/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#7F56D9',
          light: '#F4EBFF',
        },
        text: {
          primary: '#0A0D12',
          secondary: '#414651',
          tertiary: '#535862',
          placeholder: '#717680',
        },
        border: '#E9EAEB',
        'page-bg': '#F5F5F5',
        'tag-blue-bg': '#DCEAFC',
        'tag-blue-text': '#3882E0',
        'tag-yellow-bg': '#FFF3D6',
        'tag-yellow-text': '#D4900D',
        'tag-green-bg': '#D9F5E4',
        'tag-green-text': '#22A863',
        'tag-purple-bg': '#F4EBFF',
        'tag-purple-text': '#7F56D9',
        'tag-gray-bg': '#E9EAEB',
        'tag-gray-text': '#535862',
        error: '#C02C2C',
      },
    },
  },
  plugins: [],
};
