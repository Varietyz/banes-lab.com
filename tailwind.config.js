// tailwind.config.js
//const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-[url("/assets/images/Background.png")]',
    'bg-accent',
    'rounded',
    'p-2',
    'bg-gold',
    'text-dark',
    'hover:bg-accent',
    'transition-all',
    'duration-300'
  ],
  theme: {
    extend: {
      animation: {
        'pulse-ring': 'pulseRing 2s infinite',
        'pulse-ring-sotw': 'pulseRingSotw 2s infinite',
        'pulse-ring-botw': 'pulseRingBotw 2s infinite'
      },
      keyframes: {
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.7)' },
          '40%': { boxShadow: '0 0 0 6px rgba(255,255,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.7)' }
        },
        pulseRingSotw: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 195, 32, 0.7)' },
          '50%': { boxShadow: '0 0 0 6px rgba(153, 138, 0, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 176, 57, 0.822)' }
        },
        pulseRingBotw: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 32, 32, 0.7)' },
          '50%': { boxShadow: '0 0 0 6px rgba(255, 32, 32, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 32, 32, 0.7)' }
        }
      },
      colors: {
        gold: '#cea555',
        darken: '#2b2b2b',
        graphite: '#414141',
        dark: '#141414',
        grey: '#747474',
        beige: '#e6e6e6',
        lightgrey: '#c2c2c2',
        white: '#fafafa',
        discord: '#5865F2',
        accent: '#cea555',
        rosey: '#D66894',
        lotus: '#4eaac4'
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        righteous: ['Righteous', 'serif'],
        kanit: ['Kanit', 'sans-serif'],
        code: ['"Source Code Pro"', 'monospace'],
        osrs: ['"RuneScape Bold"', 'monospace']
      },
      screens: {
        xs: '480px', // Extra small devices
        sm: '640px', // Small devices (landscape phones)
        md: '768px', // Medium devices (tablets)
        lg: '1024px', // Large devices (desktops)
        xl: '1280px', // Extra large devices
        '2xl': '1536px' // High-resolution displays
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
  variants: {
    extend: {
      // Ensure responsive variants are enabled
      padding: ['responsive'],
      margin: ['responsive']
      // Add other properties as needed
    }
  },
  plugins: [
    require('@tailwindcss/typography'), // Official Tailwind Typography Plugin
    require('tailwindcss-textshadow'), // Text Shadow Plugin
    require('tailwindcss-text-fill-stroke')
  ]
};
