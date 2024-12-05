<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Workout } from '@/models/workout'
import { getAllWorkout } from '@/models/workout'

// Assuming you have a global way to get the logged-in user
const loggedInUser = ref(window.loggedInUser)

// Fetch all workouts and filter by logged-in user
const workouts = ref<Workout[]>([])
getAllWorkout()
  .then((data) => {
    // If the response is an array of workouts directly:
    workouts.value = Array.isArray(data) ? data : []
    console.log('Fetched workouts:', workouts.value)
  })
  .catch((err) => {
    console.error('Error fetching workouts:', err)
    workouts.value = []
  })

// Filter workouts by logged-in user
const userWorkouts = computed(() => {
  console.log('Workouts:', workouts.value)
  console.log('Logged In User:', loggedInUser.value)
  if (!workouts.value || !Array.isArray(workouts.value)) return []
  if (!loggedInUser.value) return []
  return workouts.value.filter((workout) => workout.userHandle === loggedInUser.value.handle)
})

// Calculate total workouts
const totalWorkouts = computed(() => {
  return userWorkouts.value.length
})

// Calculate average duration
const averageDuration = computed(() => {
  const totalDuration = userWorkouts.value.reduce((sum, workout) => sum + workout.duration, 0)
  return totalWorkouts.value > 0 ? (totalDuration / totalWorkouts.value).toFixed(2) : 0
})

// Get unique workout types
const workoutTypes = computed(() => {
  const types = userWorkouts.value.map((workout) => workout.type)
  return [...new Set(types)] // Use Set to get unique types
})
</script>
<template>
  <div v-if="userWorkouts.length > 0">
    <div class="statistics container">
      <h1 class="title has-text-centered has-text-black">Workout Statistics</h1>

      <div class="box">
        <div class="content">
          <div class="statistics-card has-text-primary">
            <div class="statistic">
              <p class="statistic-title">Total Workouts:</p>
              <p class="statistic-value">{{ totalWorkouts }}</p>
            </div>

            <div class="statistic">
              <p class="statistic-title">Average Duration:</p>
              <p class="statistic-value">{{ averageDuration }} minutes</p>
            </div>

            <div class="statistic">
              <p class="statistic-title">Workout Types:</p>
              <p class="statistic-value">{{ workoutTypes.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="has-text-danger has-text-centered">No workouts found for this user.</p>
</template>

<style scoped>
.statistics {
  margin-top: 20px;
}

.box {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.statistics-card {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.statistic {
  flex: 1 1 30%;
  margin: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.statistic-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.statistic-value {
  font-size: 1.5em;
  color: #363636; /* Darker text color for values */
}
</style>
