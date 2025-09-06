/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        lumo: {
          bg: '#0B0F15',
          bg2: '#0D1F3C',
          primary: '#2DC9FF',
          accent: '#CAFF33',
          text: '#FFFFFF',
          textMuted: '#E4E4E7',
        },
      },
      backgroundImage: {
        'lumo-hero': 'linear-gradient(to bottom, #0B0F15, #0D1F3C)',
        'lumo-cta': 'linear-gradient(to right, #2DC9FF, #CAFF33)',
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
      boxShadow: { card: '0 10px 24px rgba(0,0,0,0.25)' },
    },
  },
  plugins: [],
};
