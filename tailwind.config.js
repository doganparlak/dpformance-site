module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-red': '#ef4444', // Tailwind red-500 for consistency
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-hover': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.7s ease forwards',
        'scroll-left': 'scroll-left 20s linear infinite',
        'pulse-hover': 'pulse-hover 2s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 15px rgba(239, 68, 68, 0.5)',
      },
    },
  },
  plugins: [],
};
