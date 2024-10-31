<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '@/models/users'

// Props
const props = defineProps<{
  user: User
}>()
const emit = defineEmits(['submit', 'cancel'])
// Reactive form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  handle: '',
  isAdmin: false
})

// Watch for changes in the user prop to populate the form for editing
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = { ...newUser }
    }
  }
)

// Emit the user data back to the parent component
const submitForm = () => {
  emit('submit', { ...form.value }) // Emit the submitted user data
}
</script>

<style scoped></style>
<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title">Edit User</h2>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" v-model="form.firstName" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" v-model="form.lastName" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" v-model="form.email" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Handle</label>
            <div class="control">
              <input class="input" type="text" v-model="form.handle" required />
            </div>
          </div>
          <div class="field">
            <label class="label">Role</label>
            <div class="control">
              <select v-model="form.isAdmin">
                <option :value="false">User</option>
                <option :value="true">Admin</option>
              </select>
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-link">Update</button>
            </div>
            <div class="control">
              <button type="button" class="button is-light" @click="$emit('cancel')">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<scoped style>

</scoped>
