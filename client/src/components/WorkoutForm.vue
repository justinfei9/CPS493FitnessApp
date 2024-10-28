<script setup lang="ts">
import { ref, defineEmits, inject, type Ref } from 'vue'
import type { User } from '@/models/users'
const injected = inject<{
  loggedInUser: Ref<User | null>
  logInUser: (user: User) => void
}>('loggedInUser')

if (!injected) {
  console.error('Logged in user context not found!')
} else {
  const { loggedInUser, logInUser } = injected
}

const emit = defineEmits(['add-workout', 'close'])

const title = ref('')
const date = ref('')
const duration = ref(0)
const location = ref('')
const type = ref('')

// Function to handle form submission

const submitForm = () => {
  const newWorkout = {
    id: Math.random(), // Generate a random ID for the workout (consider a more robust ID generation in a real app)
    title: title.value,
    date: date.value,
    duration: duration.value,
    location: location.value,
    type: type.value,
    userHandle: loggedInUser.value?.firstName // Use user handle
  }

  emit('add-workout', newWorkout) // Emit the new workout data
  close() // Close the modal
}

// Function to close the form
const close = () => {
  title.value = ''
  date.value = ''
  duration.value = 0
  location.value = ''
  type.value = ''
  emit('close') // Emit close event to notify the parent component
}
</script>
<template>
  <p v-if="loggedInUser">Logged in as: {{ loggedInUser.firstName }} {{ loggedInUser.lastName }}</p>
  <p v-else>Please log in to create a workout.</p>
  <div class="modal is-active">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title">Add New Workout</h2>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                v-model="title"
                class="input"
                type="text"
                placeholder="Enter workout title"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Date (mm/dd/yyyy)</label>
            <div class="control">
              <input v-model="date" class="input" type="text" placeholder="MM/DD/YYYY" required />
            </div>
          </div>

          <div class="field">
            <label class="label">Duration (minutes)</label>
            <div class="control">
              <input
                v-model="duration"
                class="input"
                type="number"
                placeholder="Enter duration"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Location</label>
            <div class="control">
              <input
                v-model="location"
                class="input"
                type="text"
                placeholder="Enter location"
                required
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <input
                v-model="type"
                class="input"
                type="text"
                placeholder="Enter workout type"
                required
              />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" type="submit">Add Workout</button>
            </div>
            <div class="control">
              <button class="button" type="button" @click="close">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  width: 90%;
  max-width: 500px; /* Adjust max width as needed */
}
</style>
