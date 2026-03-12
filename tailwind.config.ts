import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: '#000000',       // Black background
        secondary: '#FFFFFF',     // White text
        accent: '#F94239',        // Red accent

        // Grey Scale
        'darker-grey': '#3A3A3A',
        'dark-grey': '#5A5A5A',
        'medium-grey': '#808080',
        'grey': '#A9A9A9',
        'light-grey': '#F5F5F5',

        // Orange/Red Variations
        'darker-orange': '#DA2C26',
        'darkest-orange': '#C13028',

        // Additional
        violet: '#4F045B',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        'h0': ['68px', { lineHeight: '67.6px', fontWeight: '800', letterSpacing: '0.7px' }],
        'h1': ['48px', { lineHeight: '57.6px', fontWeight: '700', letterSpacing: '0.5px' }],
        'h2': ['36px', { lineHeight: '46.8px', fontWeight: '600', letterSpacing: '0.4px' }],
        'h3': ['30px', { lineHeight: '39px', fontWeight: '500', letterSpacing: '0.5px' }],
        'h4': ['24px', { lineHeight: '31.2px', fontWeight: '500', letterSpacing: '0.4px' }],
        'h5': ['18px', { lineHeight: '25.2px', fontWeight: '100', letterSpacing: '0.5px' }],
      },
      maxWidth: {
        'container': '82rem',     // 1312px
        'wide': '90rem',          // 1440px
      },
      borderRadius: {
        'pill': '1.625rem',       // 26px for pill buttons
      },
    },
  },
  plugins: [],
};
export default config;
