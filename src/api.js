import axios from 'axios';

// Dynamically sets the Vercel production URL or falls back to local environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL
});
