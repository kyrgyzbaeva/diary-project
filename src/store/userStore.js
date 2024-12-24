import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/auth/login', credentials);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        this.fetchUser();
        router.push('/diary'); // Перенаправляем на страницу после входа
      } catch (error) {
        console.error('Ошибка входа:', error.response?.data || error.message);
        throw error;
      }
    },
    async register(data) {
      try {
        const response = await axios.post('/auth/register', data);
        console.log('Регистрация успешна:', response.data);
        router.push('/login'); // Перенаправляем на страницу входа
      } catch (error) {
        console.error('Ошибка регистрации:', error.response?.data || error.message);
        throw error;
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('/auth/me');
        this.user = response.data.user;
      } catch (error) {
        console.error('Ошибка получения пользователя:', error.response?.data || error.message);
        this.logout();
      }
    },
    async logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/login');
    },
    async checkUserAuth() {
      if (!this.token) return;
      try {
        await this.fetchUser();
      } catch (error) {
        this.logout();
      }
    },
  },
});