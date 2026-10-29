import axios from 'axios';

// When running on Vite dev server (5173), point to Django backend.
// When served directly by Django (8000 or production), use origin or relative path.
const isViteDev = typeof window !== 'undefined' && window.location.port === '5173';
export const API_BASE = isViteDev ? 'http://127.0.0.1:8000' : '';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getPosts = async (params = {}) => {
  const response = await api.get('/api/posts/', { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/api/categories/');
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/api/users/login/', { username, password });
  return response.data;
};

export const registerUser = async (username, password, confirm_password) => {
  const response = await api.post('/api/users/', {
    username,
    password,
    confirm_password,
  });
  return response.data;
};

export const createPost = async (formData) => {
  const response = await api.post('/api/posts/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getImageUrl = (path) => {
  if (!path) return 'https://placehold.co/400x300?text=No+Photo';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default api;
