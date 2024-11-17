import axios from 'axios';

// Base URL for your Django backend (adjust if necessary)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Change this to the URL where your Django app is hosted
});

export default api;
