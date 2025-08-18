
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a variable to store the setUser callback
let setUserCallback = null;

// Function to set the callback
export const setUserStateCallback = (callback) => {
  setUserCallback = callback;
};

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (setUserCallback) {
        setUserCallback(null);
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Update user state
      if (setUserCallback) {
        setUserCallback(response.data.user);
      }
    }
    return response.data;
  },

  signupFormData: async (formData) => {
    const response = await api.post('/auth/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (setUserCallback) {
        setUserCallback(response.data.user);
      }
    }
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Update user state
      if (setUserCallback) {
        setUserCallback(response.data.user);
      }
    }
    return response.data;
  },

  // Update profile (for registration pages)
  updateProfile: async (userData) => {
    let response;
    if (userData.img && typeof userData.img !== 'string') {
      // If img is a File, use FormData
      const data = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'img' && value && typeof value !== 'string') {
          data.append('img', value);
        } else if (key === 'languages' && Array.isArray(value)) {
          value.forEach(lang => data.append('languages', lang));
        } else {
          data.append(key, value);
        }
      });
      response = await api.patch('/auth/update-profile', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await api.patch('/auth/update-profile', userData);
    }
    // Update stored user data
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...response.data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Update user state
    if (setUserCallback) {
      setUserCallback(null);
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;
