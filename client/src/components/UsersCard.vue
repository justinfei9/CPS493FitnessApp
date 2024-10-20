<script setup lang="ts">
import type { User } from '@/models/users'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <div class="box">
    <div class="box-content">
      <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Handle: {{ user.handle }}</p>
      <p>Admin: {{ user.isAdmin ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<style scoped></style>
