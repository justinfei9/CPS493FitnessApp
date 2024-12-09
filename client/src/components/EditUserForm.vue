<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { User } from '@/models/users'
import { update } from '@/models/users'

// Props
const props = defineProps<{
  user: User
}>()

const emit = defineEmits(['submit', 'cancel'])

// Reactive form state
const form = ref<User>({
  firstName: '',
  lastName: '',
  email: '',
  handle: '',
  isAdmin: false,
  password: '', // Add default value for password
  id: 0 // Add default value for id
})

// Populate form data when the component is mounted
onMounted(() => {
  form.value = { ...props.user }
})

// Watch for changes in the user prop to populate the form
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = { ...newUser }
    }
  },
  { immediate: true }
)

// Emit the user data back to the parent component
const submitForm = async () => {
  try {
    await update(form.value) // Update the user data
    emit('submit', { ...form.value }) // Emit the updated user data
  } catch (error) {
    console.error('Failed to update user:', error)
  }
}

// Handle cancel action
const cancelForm = () => {
  emit('cancel') // Emit the cancel event
}
</script>

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
              <button type="submit" class="button is-link">Update</button>
            </div>
            <div class="control">
              <button type="button" class="button is-danger" @click="cancelForm">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
