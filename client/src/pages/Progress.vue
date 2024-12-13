<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getAll } from '@/models/progress'
import type { Progress } from '@/models/progress'

// Function to filter and sort progress data for the logged-in user
function getUserProgress(allProgressData: Progress[], loggedInUserId: number): Progress[] {
  if (!allProgressData || !Array.isArray(allProgressData)) {
    console.error('Invalid progress data')
    return []
  }

  if (!loggedInUserId) {
    console.error('Invalid user ID')
    return []
  }
  return allProgressData
    .filter((data) => data.id === loggedInUserId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

const loggedInUser = ref(window.loggedInUser)
const progressData = ref<Progress[]>([])
const userSortedProgress = ref<Progress[]>([])

onMounted(async () => {
  try {
    const result = await getAll()
    console.log('Progress data:', result.data)
    progressData.value = result.data

    // Use the function to get filtered and sorted progress data
    if (loggedInUser.value) {
      userSortedProgress.value = getUserProgress(progressData.value, loggedInUser.value.id)
    }
  } catch (error) {
    console.error('Error fetching progress data:', error)
  }
})

// Compute weights dynamically from sorted progress
const initialWeight = computed(() => userSortedProgress.value[0]?.weight || null)
const currentWeight = computed(
  () => userSortedProgress.value[userSortedProgress.value.length - 1]?.weight || null
)
console.log(userSortedProgress.value)

// Extract all weight data for the logged-in user
const weightData = computed(() =>
  userSortedProgress.value.map((data) => ({
    date: data.date,
    weight: data.weight
  }))
)

// Compute weight change and percentage change
const weightChange = computed(() => {
  console.log('array' + userSortedProgress.value)
  if (currentWeight.value !== null && initialWeight.value !== null) {
    return currentWeight.value - initialWeight.value
  }
  return 0
})
const weightPercentageChange = computed(() => {
  if (initialWeight.value) {
    return ((weightChange.value / initialWeight.value) * 100).toFixed(2)
  }
  return 0
})
</script>

<template>
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
    <h1>test</h1>
    <!-- Display all progress records -->
    <div class="progress-list">
      <h2 class="subtitle has-text-centered">All Progress Records</h2>
      <div v-for="(record, index) in weightData" :key="index" class="progress-item">
        <p>
          Date: <strong>{{ record.date }}</strong
          >, Weight: <strong>{{ record.weight }}</strong> kg
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress {
  margin-top: 20px;
}

.box {
  padding: 20px;
  border-radius: 0px;
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
  border-radius: 0px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.progress-value {
  font-size: 1.5em;
  color: #363636;
}

.progress-list {
  margin-top: 20px;
}

.progress-item {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>
