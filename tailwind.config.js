/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7F56D9',
          inverse: '#FCFAFF',
        },
        text: {
          primary: '#0A0D12',
          secondary: '#414651',
          tertiary: '#535862',
          quaternary: '#717680',
        },
        border: {
          primary: '#E9EAEB',
          error: '#C0382D',
        },
        bg: {
          page: '#F5F5F7',
          card: '#FFFFFF',
          error: '#FFF3F3',
          'error-border': '#F4C7C5',
          warning: '#FFF8E9',
          'warning-border': '#F3D2A3',
        },
        error: {
          DEFAULT: '#C0382D',
          text: '#C03829',
        },
        warning: {
          DEFAULT: '#985B08',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 20px 24px -4px rgba(10,13,18,0.1)',
      },
      borderRadius: {
        card: '12px',
        input: '8px',
        button: '8px',
        banner: '8px',
      },
    },
  },
  plugins: [],
};
