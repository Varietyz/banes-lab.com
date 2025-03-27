// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: ['bg-[url("/assets/images/Background.png")]'],
  theme: {
    extend: {
      colors: {
        gold: '#cea555',
        dark: '#101010',
        accent: '#cea555'
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Montserrat', 'sans-serif']
      },
      typography: theme => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.gold'),
            '--tw-prose-lead': theme('colors.white'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.gold'),
            '--tw-prose-counters': theme('colors.white'),
            '--tw-prose-bullets': theme('colors.gold'),
            '--tw-prose-hr': theme('colors.gray.700'),
            '--tw-prose-quotes': theme('colors.gray.300'),
            '--tw-prose-quote-borders': theme('colors.accent'),
            '--tw-prose-code': theme('colors.accent'),
            '--tw-prose-pre-bg': theme('colors.zinc.900'),
            '--tw-prose-pre-code': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.gray.600'),
            '--tw-prose-td-borders': theme('colors.gray.700')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
