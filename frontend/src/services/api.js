import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },
  
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await axios.post(`${API_BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// Activities API
export const activitiesAPI = {
  getAll: async () => {
    const response = await api.get('/activities');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },
  
  create: async (activityData) => {
    const response = await api.post('/activities', activityData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },
  
  getRecommendations: async () => {
    const response = await api.get('/recommendations');
    return response.data;
  },
};

export default api;
