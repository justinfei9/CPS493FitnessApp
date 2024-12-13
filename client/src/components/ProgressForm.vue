<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { create } from '@/models/progress'
import type { Progress } from '@/models/progress'

const loggedInUser = ref(window.loggedInUser) // Assuming this is available globally

// Reactive variables for form data
const progressForm = ref<Partial<Progress>>({
  user_handle: loggedInUser.value?.handle || '',
  weight: undefined,
  date: new Date().toISOString().split('T')[0] // Default to today's date
})

// Reactive variable for form submission status
const formStatus = ref<'idle' | 'success' | 'error'>('idle')

// Function to handle form submission
async function submitProgress() {
  if (!progressForm.value.weight || !progressForm.value.date) {
    alert('Please provide all required fields.')
    return
  }

  try {
    formStatus.value = 'idle'
    const newProgress: Progress = {
      ...progressForm.value,
      id: 0, // ID will be auto-generated on the server side
      created_at: new Date().toISOString() // Auto-generate `created_at`
    } as Progress

    await create(newProgress)
    formStatus.value = 'success'
    alert('Progress successfully added!')
    resetForm()
  } catch (error) {
    console.error('Error creating progress:', error)
    formStatus.value = 'error'
    alert('Failed to add progress. Please try again.')
  }
}

// Function to reset form after submission
function resetForm() {
  progressForm.value.weight = undefined
  progressForm.value.date = new Date().toISOString().split('T')[0]
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title has-text-centered">Add Progress</h1>

      <form @submit.prevent="submitProgress">
        <div class="field">
          <label class="label">Weight (lbs)</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Enter your weight"
              v-model.number="progressForm.weight"
              min="0"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input class="input" type="date" v-model="progressForm.date" required />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" type="submit">Submit</button>
          </div>
          <div class="control">
            <button class="button is-light" type="button" @click="resetForm">Reset</button>
          </div>
        </div>
      </form>

      <!-- Display form submission status -->
      <div v-if="formStatus === 'success'" class="notification is-success">
        Progress successfully added!
      </div>
      <div v-if="formStatus === 'error'" class="notification is-danger">
        Failed to add progress. Please try again.
      </div>
    </div>
  </section>
</template>

<style scoped></style>
