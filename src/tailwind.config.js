/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D9A05B", // সুও শির মতো প্রিমিয়াম গোল্ডেন/বাদামী কালার
          light: "#EBC49F",
        },
        secondary: {
          DEFAULT: "#006837", // গাঢ় সবুজ (অ্যাপয়েন্টমেন্ট বাটনের জন্য)
          dark: "#004D29",
        },
        accent: "#FDF4E3", // হালকা ব্যাকগ্রাউন্ড এক্সেন্ট
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(217, 160, 91, 0.2)', // হালকা শ্যাডো
      }
    },
  },
  plugins: [],
}