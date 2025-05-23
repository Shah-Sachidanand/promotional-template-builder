/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0A84FF', // Primary color
          600: '#0075E6',
          700: '#0066CC',
          800: '#0057B3',
          900: '#004899'
        },
        secondary: {
          50: '#EFEEFD',
          100: '#DEDCFB',
          200: '#BDB9F7',
          300: '#9C97F3',
          400: '#7B74F0',
          500: '#5E5CE6', // Secondary color
          600: '#3935DD',
          700: '#2723C6',
          800: '#201CA5',
          900: '#191784'
        },
        accent: {
          50: '#FFF5E6',
          100: '#FFEACC',
          200: '#FFD599',
          300: '#FFC066',
          400: '#FFAB33',
          500: '#FF9F0A', // Accent color
          600: '#E68600',
          700: '#CC7700',
          800: '#B36700',
          900: '#995800'
        },
        success: {
          50: '#E8F7ED',
          100: '#D1EFDB',
          200: '#A3DFB7',
          300: '#75CF94',
          400: '#47BF70',
          500: '#2CBB57', // Success color
          600: '#259E4B',
          700: '#1F823E',
          800: '#196631',
          900: '#124A24'
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE499',
          300: '#FFD666',
          400: '#FFC833',
          500: '#FFBB00', // Warning color
          600: '#E6A800',
          700: '#CC9500',
          800: '#B38200',
          900: '#996F00'
        },
        error: {
          50: '#FCE6E6',
          100: '#F9CCCC',
          200: '#F39999',
          300: '#EC6666',
          400: '#E63333',
          500: '#FF3B30', // Error color
          600: '#E60000',
          700: '#CC0000',
          800: '#B30000',
          900: '#990000'
        },
        neutral: {
          50: '#F8F8F8',
          100: '#F1F1F1',
          200: '#E4E4E4',
          300: '#D1D1D1',
          400: '#B4B4B4',
          500: '#919191',
          600: '#6D6D6D',
          700: '#4D4D4D',
          800: '#2E2E2E',
          900: '#1A1A1A'
        }
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 30px rgba(0, 0, 0, 0.12)'
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '128': '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};