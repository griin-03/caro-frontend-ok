/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Dòng này cực quan trọng để nhận diện file trong src
    ],
    darkMode: 'class', 
    theme: {
      extend: {
        colors: {
          gaming: {
            bg: 'var(--gaming-bg)',      
            card: 'var(--gaming-card)',    
            border: 'var(--gaming-border)',  
            primary: 'var(--gaming-primary)', 
            text: 'var(--gaming-text)',    
            muted: 'var(--gaming-muted)',   
          }
        }
      },
    },
    plugins: [],
  }