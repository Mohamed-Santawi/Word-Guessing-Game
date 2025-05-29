// API URL configuration
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://word-guessing-game-backend.onrender.com'  // Replace with your actual backend URL
  : 'http://localhost:8080';
