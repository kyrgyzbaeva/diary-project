import axios from 'axios';

const API_URL = 'http://localhost:3000/auth'; // Базовый URL вашего бэкенда

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Ошибка при регистрации';
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Ошибка при входе';
  }

};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Ошибка проверки авторизации';
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    console.log('Registration successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message);
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
};