import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  // Maximum request duration in milliseconds
  timeout: 15000,

  // Default request headers
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
