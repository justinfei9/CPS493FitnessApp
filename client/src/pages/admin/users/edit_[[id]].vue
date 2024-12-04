<script setup lang="ts">
import { ref } from 'vue'
import { type User, create, getById, update } from '@/models/users'
import { useRoute } from 'vue-router'

// Ref for the user object
const user = ref<User>({
  firstName: '',
  lastName: '',
  email: '',
  handle: '',
  isAdmin: false,
  password: '',
  id: 0
})

// Get the route parameters
const route = useRoute()

// If an ID is present in the route, fetch the user details
if (route.params.id) {
  getById(+route.params.id).then((data) => {
    user.value = data.data
  })
}

// Submit handler for saving or updating a user
function onSubmit() {
  if (route.params.id) {
    update(user.value).then((data) => {
      console.log('User updated:', data)
    })
  } else {
    create(user.value).then((data) => {
      console.log('User created:', data)
    })
  }
}
</script>

<template>
  <div>
    <h1 class="title">{{ route.params.id ? 'Edit' : 'Add' }} User</h1>
    <form @submit.prevent="onSubmit">
      <!-- First Name -->
      <div class="field">
        <label class="label">First Name</label>
        <div class="control">
          <input class="input" type="text" v-model="user.firstName" required />
        </div>
      </div>

      <!-- Last Name -->
      <div class="field">
        <label class="label">Last Name</label>
        <div class="control">
          <input class="input" type="text" v-model="user.lastName" required />
        </div>
      </div>

      <!-- Email -->
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="user.email" required />
        </div>
      </div>

      <!-- Handle -->
      <div class="field">
        <label class="label">Handle</label>
        <div class="control">
          <input class="input" type="text" v-model="user.handle" required />
        </div>
      </div>

      <!-- Password -->
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" v-model="user.password" required />
        </div>
      </div>

      <!-- Is Admin -->
      <div class="field">
        <label class="label">Admin</label>
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="user.isAdmin" />
            Is Admin
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="field">
        <div class="control">
          <button class="button is-primary">{{ route.params.id ? 'Update' : 'Create' }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>
