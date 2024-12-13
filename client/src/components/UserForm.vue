<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { create } from '@/models/progress'
import type { Progress } from '@/models/progress'

const emit = defineEmits(['submit', 'cancel'])

// Local state for the form data
const formProgress = ref<Progress>({
  user_handle: '',
  weight: 0,
  date: '',
  id: 0,
  created_at: ''
})

// Handle form submission
async function submitForm() {
  try {
    const newProgress = formProgress.value
    await create(newProgress) // Send the new progress data to the API
    emit('submit', newProgress) // Optionally, emit the updated progress to parent component
    resetForm() // Reset the form
  } catch (error) {
    console.error('Failed to add progress:', error)
  }
}

// Reset form fields
function resetForm() {
  formProgress.value = {
    user_handle: '',
    weight: 0,
    date: '',
    id: 0,
    created_at: ''
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
        <p class="modal-card-title">Add Progress</p>
        <button class="delete" aria-label="close" @click="cancelForm"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Weight (lbs)</label>
          <input
            class="input"
            v-model="formProgress.weight"
            type="number"
            placeholder="Enter weight"
            required
          />
        </div>
        <div class="field">
          <label class="label">Date</label>
          <input
            class="input"
            v-model="formProgress.date"
            type="date"
            placeholder="Select the date"
            required
          />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="submitForm">Save Progress</button>
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
