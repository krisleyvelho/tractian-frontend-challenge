import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			backgroundBlue: '#17192D',
  			activeBlue: '#2188FF',
  			defaultBlue: '#023B78',
  			'container-bg-color': '#D8DFE6',
  			'title-active-color': '#24292F',
  			'title-inactive-color': '#77818C'
  		},
  		backgroundColor: {
  			'body-slate': '#D8DFE6'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
