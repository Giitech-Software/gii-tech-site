/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← Important!
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E2A78',
        accent:  '#00D1FF',
        cta:     '#0052CC',
        text:    '#333333',
        background: '#F4F6F8',
      },

      // Custom prose (typography) styles
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary'),
              textDecoration: 'underline',
            },
            strong: { color: theme('colors.primary') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
