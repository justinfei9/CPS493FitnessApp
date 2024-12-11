<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAll } from '@/models/progress' // Assuming this function fetches weight data from the progress table
import type { Progress } from '@/models/progress'

// Assuming you have a global way to get the logged-in user
const loggedInUser = ref(window.loggedInUser)

const progressData = ref<Progress[]>([])
onMounted(async () => {
  // Fetch the user's progress data, assuming the API is designed to get progress data for the logged-in user
  const result = await getAll() // Assuming user ID is available
  progressData.value = result.data
})

// Filter progress data for the logged-in user (if necessary)
const userProgress = computed(() => {
  if (!progressData.value || !Array.isArray(progressData.value)) return []
  if (!loggedInUser.value) return []
  return progressData.value.filter((data) => data.id === loggedInUser.value.id) // Ensure data is filtered based on userId
})

// Extract weight data (assuming weight is part of progress data)
const weightData = computed(() => {
  return userProgress.value
    .map((data) => ({
      date: data.date,
      weight: data.weight // Assuming weight is part of the progress data
    }))
    .filter((data) => data.weight !== null)
})

// Calculate progress: Change in weight over time (e.g., from the last recorded weight)
const currentWeight = computed(() => {
  const lastWeight = weightData.value[weightData.value.length - 1]
  return lastWeight ? lastWeight.weight : null
})

// Calculate weight change from the first recorded weight
const initialWeight = computed(() => weightData.value[0]?.weight)
const weightChange = computed(() => {
  if (currentWeight.value !== null && initialWeight.value !== null) {
    return currentWeight.value - initialWeight.value
  }
  return 0
})

// Calculate percentage change in weight
const weightPercentageChange = computed(() => {
  if (initialWeight.value) {
    return ((weightChange.value / initialWeight.value) * 100).toFixed(2)
  }
  return 0
})
</script>

<template>
  <div v-if="weightData.length > 0">
    <div class="progress container">
      <h1 class="title has-text-centered has-text-black">Weight Progress</h1>

      <div class="box">
        <div class="content">
          <div class="progress-card has-text-primary">
            <div class="progress-statistic">
              <p class="progress-title">Initial Weight:</p>
              <p class="progress-value">{{ initialWeight }} kg</p>
            </div>

            <div class="progress-statistic">
              <p class="progress-title">Current Weight:</p>
              <p class="progress-value">{{ currentWeight }} kg</p>
            </div>

            <div class="progress-statistic">
              <p class="progress-title">Weight Change:</p>
              <p class="progress-value">{{ weightChange }} kg</p>
            </div>

            <div class="progress-statistic">
              <p class="progress-title">Percentage Change:</p>
              <p class="progress-value">{{ weightPercentageChange }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- You can add a progress bar or chart here to visualize the weight change -->
    </div>
  </div>
  <p v-else class="has-text-danger has-text-centered">No weight data found for this user.</p>
</template>

<style scoped>
.progress {
  margin-top: 20px;
}

.box {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-card {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.progress-statistic {
  flex: 1 1 30%;
  margin: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.progress-value {
  font-size: 1.5em;
  color: #363636; /* Darker text color for values */
}
</style>
