<template>
    <div>
      <h1>Your Diary</h1>
      <button @click="logout">Logout</button>
      <form @submit.prevent="createEntry">
        <input v-model="title" type="text" placeholder="Entry Title" required />
        <textarea v-model="content" placeholder="Write your thoughts here..." required></textarea>
        <button type="submit">Add Entry</button>
      </form>
      <div v-if="entries.length">
        <h2>Your Entries:</h2>
        <ul>
          <li v-for="entry in entries" :key="entry.id">
            <h3>{{ entry.title }}</h3>
            <p>{{ entry.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: '',
        entries: [],
      };
    },
    methods: {
      async fetchEntries() {
        try {
          const response = await fetch('http://localhost:3000/posts', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          this.entries = await response.json();
        } catch (error) {
          console.error('Error fetching entries:', error);
        }
      },
      async createEntry() {
        try {
          const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ title: this.title, content: this.content }),
          });
          if (response.ok) {
            this.fetchEntries();
            this.title = '';
            this.content = '';
          }
        } catch (error) {
          console.error('Error creating entry:', error);
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
    },
    mounted() {
      this.fetchEntries();
    },
  };
  </script>