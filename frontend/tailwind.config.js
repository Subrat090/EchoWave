/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob1: "blob 8s ease-in-out infinite",
        blob2: "blob 10s ease-in-out infinite",
        blob3: "blob 12s ease-in-out infinite",
        blob4: "blob 14s ease-in-out infinite",
        blob5: "blob 16s ease-in-out infinite",
        blob6: "blob 18s ease-in-out infinite",
        fadeSlide: "fadeSlide 1.2s ease-out forwards",
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 25px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        fadeSlide: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}
