import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  actions: {
    async login(email, password) {
      const response = await axios.post('/api/login', { email, password });
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const useDiaryStore = defineStore('diary', {
  state: () => ({
    entries: [],
  }),
  actions: {
    async fetchEntries() {
      const response = await axios.get('/api/diary', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      this.entries = response.data;
    },
    async createEntry(entry) {
      const response = await axios.post('/api/diary', entry, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      this.entries.push(response.data);
    },
  },
});