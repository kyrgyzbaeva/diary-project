<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const register = async () => {
      try {
        const userData = { username: username.value, email: email.value, password: password.value };
        const response = await axios.post('/auth/register', userData);
        console.log('Registration successful:', response.data);
        errorMessage.value = '';
      } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        errorMessage.value = 'Registration failed: ' + (error.response?.data.message || error.message);
      }
    };

    return {
      username,
      email,
      password,
      register,
      errorMessage,
    };
  },
};
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label>Username:</label>
        <input v-model="username" type="text" />
      </div>
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" />
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </form>
  </div>
</template>