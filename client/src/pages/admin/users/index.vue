<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type User } from '@/models/users'

// Define `users` as a ref to hold user data
const users = ref([] as User[])

// Fetch user data
getAll().then((data) => {
  console.log(data)
  users.value = data.data
})
console.log('working')
</script>

<template>
  <div>
    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Handle</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through `users` -->
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.handle }}</td>
          <td>{{ user.isAdmin ? 'Yes' : 'No' }}</td>
          <td>
            <router-link :to="'/admin/Users/edit/' + user.id" class="btn btn-primary">
              Edit
            </router-link>
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
