// API URL configuration
export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://wordgame-app-faf3f0210884.herokuapp.com'
  : 'http://localhost:8080';
