<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { User } from '@/models/users'
import { create } from '@/models/users'

const emit = defineEmits(['submit', 'cancel'])

// Local state for the form data
const formUser = ref<User>({
  firstName: '',
  lastName: '',
  email: '',
  handle: '',
  isAdmin: false,
  password: '',
  id: 0
})

// Handle form submission
async function submitForm() {
  try {
    const newUser = formUser.value
    await create(newUser) // Send the new user data to the API
    emit('submit', newUser) // Optionally, emit the updated user to parent component
    resetForm() // Reset the form
  } catch (error) {
    console.error('Failed to add user:', error)
  }
}

// Reset form fields
function resetForm() {
  formUser.value = {
    firstName: '',
    lastName: '',
    email: '',
    handle: '',
    isAdmin: false,
    password: '',
    id: 0
  }
}

function cancelForm() {
  emit('cancel')
  resetForm()
}
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background" @click="cancelForm"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add New User</p>
        <button class="delete" aria-label="close" @click="cancelForm"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">First Name</label>
          <input
            class="input"
            v-model="formUser.firstName"
            type="text"
            placeholder="Enter first name"
          />
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <input
            class="input"
            v-model="formUser.lastName"
            type="text"
            placeholder="Enter last name"
          />
        </div>
        <div class="field">
          <label class="label">Email</label>
          <input class="input" v-model="formUser.email" type="email" placeholder="Enter email" />
        </div>
        <div class="field">
          <label class="label">Handle</label>
          <input class="input" v-model="formUser.handle" type="text" placeholder="Enter handle" />
        </div>
        <div class="field">
          <label class="checkbox">
            <input type="checkbox" v-model="formUser.isAdmin" /> Admin
          </label>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input
            class="input"
            v-model="formUser.password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="submitForm">Save User</button>
        <button class="button is-danger" @click="cancelForm">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.field {
  margin-bottom: 1rem;
}
.modal-card-foot button {
  margin: 0px 20px;
}
</style>
