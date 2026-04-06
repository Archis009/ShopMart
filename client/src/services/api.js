import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getProfile: () =>
    api.get('/auth/profile')
};

// Product API
export const productAPI = {
  getAll: (category, search) =>
    api.get('/products', { params: { category, search } }),
  getById: (id) =>
    api.get(`/products/${id}`),
  create: (productData) =>
    api.post('/products', productData),
  update: (id, productData) =>
    api.patch(`/products/${id}`, productData),
  delete: (id) =>
    api.delete(`/products/${id}`)
};

// Order API
export const orderAPI = {
  create: (orderData) =>
    api.post('/orders', orderData),
  getMyOrders: () =>
    api.get('/orders'),
  getById: (id) =>
    api.get(`/orders/${id}`),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}`, { status }),
  getAll: () =>
    api.get('/orders/admin/all')
};

export default api;
