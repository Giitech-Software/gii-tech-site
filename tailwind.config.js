/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← Important!
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Existing Tech Palette ---
        primary: '#1E2A78',
        accent: '#00D1FF',
        cta: '#0052CC',
        text: '#333333',
        background: '#F4F6F8',

        // --- New Stunning Warm Palette ---
        warm: {
          light: '#FFF9F5',  // Soft cream for backgrounds
          DEFAULT: '#F97316', // Vibrant Orange (Sunset)
          amber: '#F59E0B',   // Golden Amber for highlights
          terracotta: '#C2410C', // Deep warm red-orange for borders/headers
          sand: '#E5E7EB',    // Neutral warm gray
        },
      },

      // Custom prose (typography) styles
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.warm.DEFAULT'), // Updated links to warm orange
              '&:hover': {
                color: theme('colors.warm.terracotta'),
              },
              textDecoration: 'underline',
            },
            strong: { color: theme('colors.primary') },
            h1: { color: theme('colors.primary') },
            h2: { color: theme('colors.primary') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};