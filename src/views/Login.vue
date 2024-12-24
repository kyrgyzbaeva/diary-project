<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        const userData = { username: username.value, email: email.value, password: password.value };
        const response = await axios.post('/auth/login', userData);
        console.log('Login successful:', response.data);
        errorMessage.value = '';
        // Сохраните токен в localStorage или Pinia
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        errorMessage.value = 'Login failed: ' + (error.response?.data?.message || 'Unknown error');
      }
    };

    return { email, password, errorMessage, login };
  },
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p style="color: red">{{ errorMessage }}</p>
  </div>
</template>