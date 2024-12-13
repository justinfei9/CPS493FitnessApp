<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAll } from '@/models/progress'
import type { Progress } from '@/models/progress'
import ProgressForm from '@/components/ProgressForm.vue' // Assuming you have a ProgressForm component

// Define reactive variables
const loggedInUser = ref(window.loggedInUser) // Assuming `loggedInUser` is provided by the global scope
const progressData = ref<Progress[]>([])
const userProgressData = ref<Progress[]>([])

// Toggle to show/hide the modal
const isAddingProgress = ref(false)

// Fetch and filter progress data
onMounted(async () => {
  try {
    const result = await getAll()
    console.log('Fetched Progress Data:', result.data)
    progressData.value = result.data

    // Filter data for the logged-in user
    if (loggedInUser.value) {
      userProgressData.value = progressData.value.filter(
        (record) => record.user_handle === loggedInUser.value.handle
      )
    }

    console.log('User Progress Data:', userProgressData.value)
  } catch (error) {
    console.error('Error fetching progress data:', error)
  }
})

// Function to sort data by date
function sortProgressByDate(data: Progress[]): Progress[] {
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

// Computed properties for initial and current weights
const sortedUserProgress = computed(() => sortProgressByDate(userProgressData.value))
const initialWeight = computed(() => sortedUserProgress.value[0]?.weight || 'N/A')
const currentWeight = computed(
  () => sortedUserProgress.value[sortedUserProgress.value.length - 1]?.weight || 'N/A'
)

// Function to add new progress data
function addProgress(newProgress: Progress) {
  userProgressData.value.push(newProgress)
  isAddingProgress.value = false // Close the modal after adding progress
}
const highestWeight = computed(() => {
  if (userProgressData.value.length === 0) return 'N/A'
  return Math.max(...userProgressData.value.map((record) => record.weight))
})

const lowestWeight = computed(() => {
  if (userProgressData.value.length === 0) return 'N/A'
  return Math.min(...userProgressData.value.map((record) => record.weight))
})
</script>

<template>
  <section class="section">
    <div class="container">
      <!-- Container for progress data -->
      <div v-if="userProgressData.length > 0">
        <!-- First row of columns (Initial Weight and Current Weight) -->
        <div class="columns">
          <div class="column is-half">
            <article class="message is-primary">
              <div class="message-header">
                <p>Initial Weight</p>
              </div>
              <div class="message-body has-text-centered">
                <span class="has-text-weight-bold">{{ initialWeight }} lbs</span>
              </div>
            </article>
          </div>

          <div class="column is-half">
            <article class="message is-warning">
              <div class="message-header">
                <p>Current Weight</p>
              </div>
              <div class="message-body has-text-centered">
                <span class="has-text-weight-bold">{{ currentWeight }} lbs</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Second row of columns (Highest Weight and Lowest Weight) -->
        <div class="columns">
          <div class="column is-half">
            <article class="message is-danger">
              <div class="message-header">
                <p>Highest Weight</p>
              </div>
              <div class="message-body has-text-centered">
                <span class="has-text-weight-bold">{{ highestWeight }} lbs</span>
              </div>
            </article>
          </div>

          <div class="column is-half">
            <article class="message is-success">
              <div class="message-header">
                <p>Lowest Weight</p>
              </div>
              <div class="message-body has-text-centered">
                <span class="has-text-weight-bold">{{ lowestWeight }} lbs</span>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Modal for Progress Form -->
      <div v-if="isAddingProgress" class="modal is-active">
        <div class="modal-background" @click="isAddingProgress = false"></div>
        <div class="modal-content">
          <ProgressForm @submit="addProgress" @cancel="isAddingProgress = false" />
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          @click="isAddingProgress = false"
        ></button>
      </div>

      <!-- Add Progress Button (Visible when logged in) -->
      <div v-if="loggedInUser" class="has-text-centered my-5">
        <button
          class="button is-link has-text-white is-large px-6 py-4"
          @click="isAddingProgress = true"
        >
          <i class="fas fa-plus icon-margin"></i> Add Progress
        </button>
      </div>

      <!-- Message if no user is logged in -->
    </div>
  </section>
</template>

<style scoped>
.icon-margin {
  margin-right: 0.5rem;
}

.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  position: relative;
  margin: 15% auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  max-width: 500px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Style the button */
.button.is-link {
  font-size: 1.5rem; /* Bigger text */
  padding: 15px 30px; /* Padding for a larger button */
}

.has-text-centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
