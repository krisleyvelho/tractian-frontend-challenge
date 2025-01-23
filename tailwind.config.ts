import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        darkBlue: '#17192D',
        activeBlue: '#2188FF',
        defaultBlue: '#023B78',
        'title-active-color': '#24292F',
        'title-inactive-color': '#77818C',
        'muted-gray': '#88929C',
        'defaultGreen': '#52C41A',
        'defaultRed': '#ED3833',
        defaultSlate: '#D8DFE6',
      },
      borderColor: {},
      backgroundColor: {},
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        sans: ['"Inter"', "sans-serif"], 
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
