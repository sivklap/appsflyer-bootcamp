import api from './authService';

export async function registerUser(type, data) {
  try {
    const response = await api.post('/users', { ...data, type });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Registration error');
  }
}
