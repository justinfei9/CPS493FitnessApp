<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll, type User } from '@/models/users'
import UsersCard from '../../components/UsersCard.vue'

// Simulating a logged-in user and their role
const loggedInUser = ref(window.loggedInUser)
const users = ref<User[]>([])

users.value = getAll().data

// Check if the user is logged in and is an admin
const isAdminUser = computed(() => {
  return loggedInUser.value && loggedInUser.value.isAdmin
})
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Users</h1>

    <!-- Conditional rendering based on user's admin status -->
    <div v-if="isAdminUser">
      <button class="button is-primary has-text-white">
        <i class="fas fa-plus icon-margin"></i> Add User
      </button>
      <table class="table is-bordered is-hoverable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Handle</th>
            <th>Status</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.handle">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.handle }}</td>
            <td>
              <span class="tag" :class="user.isAdmin ? 'is-success' : 'is-warning'">
                {{ user.isAdmin ? 'Admin' : 'User' }}
              </span>
            </td>
            <td>
              <button class="button is-small is-primary">
                <i class="fas fa-edit"></i>
              </button>
              <button class="button is-small is-danger">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p class="has-text-danger">You do not have permission to view this content.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
}
.table td {
  padding-right: 5rem;
}
.table td button {
  margin-right: 0.5rem;
}
.icon-margin {
  margin-right: 0.5rem;
}
</style>
