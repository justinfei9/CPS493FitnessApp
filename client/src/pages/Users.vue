<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Users</h1>
      <p class="subtitle">List of users will go here...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// You can use your TypeScript logic here, e.g., data or methods
import { ref } from 'vue'

const users = ref(['User1', 'User2', 'User3'])
</script>

<style scoped></style>
