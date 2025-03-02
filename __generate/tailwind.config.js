/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.js"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Lexend", "sans-serif"],
        },
        colors: {
          primary: 'var(--primary)',
          background: 'var(--background)',
          text: 'var(--text)',
          "border-button-background": "var(--border-button-background)",
          "card-background": "var(--card-background)",
          logo: 'var(--logo)',
          "logo-secondary": "var(--logo-secondary)",
          gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          }
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100%',
              color: '#e5e7eb',
              h1: {
                color: '#f3f4f6',
              },
              h2: {
                color: '#f3f4f6',
              },
              h3: {
                color: '#f3f4f6',
              },
              strong: {
                color: '#f3f4f6',
              },
              a: {
                color: 'var(--primary)',
                '&:hover': {
                  color: 'var(--primary)',
                },
              },
              code: {
                color: '#f3f4f6',
              },
              blockquote: {
                color: '#d1d5db',
              },
              ol: {
                li: {
                  '&::marker': {
                    color: '#e5e7eb',
                  },
                },
              },
              img: {
                borderRadius: '0.6rem',
              },
            },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography')
    ],
  }