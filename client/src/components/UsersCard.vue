<script setup lang="ts">
import type { User } from '@/models/users'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <div class="box">
    <h3>{{ user.firstName }} {{ user.lastName }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Handle: {{ user.handle }}</p>
    <span class="tag" :class="user.isAdmin ? 'is-success' : 'is-warning'">
      {{ user.isAdmin ? 'Admin' : 'User' }}
    </span>
  </div>
</template>

<style scoped>
.box {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
