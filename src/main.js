import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // Убедитесь, что адрес верный

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');