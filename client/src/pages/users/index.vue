<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type User } from '@/models/users'
import UsersCard from '@/components/UsersCard.vue'

const users = ref<User[]>([])
users.value = getAll().data
</script>

<template>
  <div class="container">
    <h1 class="title">Users</h1>
    <div class="columns is-multiline">
      <div class="column is-one-third" v-for="user in users" :key="user.handle">
        <UsersCard :user="user" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
.shelf .box {
  width: 300px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
