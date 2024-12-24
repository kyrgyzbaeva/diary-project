<template>
    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="Entry title" />
      <textarea v-model="content" placeholder="Entry content"></textarea>
      <button type="submit">Save</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: '',
      };
    },
    methods: {
      submitForm() {
        this.$emit('submit', { title: this.title, content: this.content });
      },
    },
  };
  </script>