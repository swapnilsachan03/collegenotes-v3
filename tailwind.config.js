/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['Inter', 'sans-serif'],
        roboto_condensed: ['Roboto Condensed', 'sans-serif'],
        source: ["source-serif-pro", 'serif'],
        lusitana: ['Lusitana', 'Inter'],
      },
      backgroundImage: {
        'about': "url('https://images.unsplash.com/photo-1544411047-c491e34a24e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
      },
    },
  },
  plugins: [],
}
