<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WorkoutCard from '@/components/WorkoutCard.vue'
import WorkoutForm from '@/components/WorkoutForm.vue'
import { ref, computed } from 'vue'
import type { Workout } from '@/models/workout'
import { getAllWorkout } from '@/models/workout'

// Fetch all workouts and filter by logged-in user
const isLoading = ref(true)
const workouts = ref<Workout[]>([])
getAllWorkout()
  .then((data) => {
    workouts.value = data?.data || []
    console.log('Fetched workouts:', workouts.value)
    isLoading.value = false
  })
  .catch((err) => {
    console.error('Error fetching workouts:', err)
    workouts.value = []
    isLoading.value = false
  })
// Filter workouts by logged-in user
const userWorkouts = computed(() => {
  console.log('Workouts:', workouts.value)
  console.log('Logged In User:', loggedInUser.value)
  if (!workouts.value || !Array.isArray(workouts.value)) return []
  if (!loggedInUser.value) return []
  return workouts.value.filter((workout) => workout.userHandle === loggedInUser.value.handle)
})
const isFormOpen = ref(false)
// Assuming you have a global way to get the logged-in user
const loggedInUser = ref(window.loggedInUser) // Make sure this is set correctly

// Compute the user's workouts

const openWorkoutForm = () => {
  isFormOpen.value = true
}

const addWorkout = (newWorkout: Workout) => {
  // Add the new workout to the workouts array
  newWorkout.userHandle = loggedInUser.value.handle // Set the userHandle for the new workout
  workouts.value.unshift(newWorkout) // Add the new workout to the workouts array
  isFormOpen.value = false
}

const closeForm = () => {
  isFormOpen.value = false
}
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Workouts</h1>
    <button class="button is-primary has-text-white" @click="openWorkoutForm">
      <i class="fas fa-plus icon-margin"></i> Add Workout
    </button>

    <!-- Show the workout form conditionally -->
    <WorkoutForm v-if="isFormOpen" @add-workout="addWorkout" @close="closeForm" />

    <div class="workouts-list">
      <WorkoutCard v-for="workout in userWorkouts" :key="workout.id" :workout="workout" />
    </div>
  </div>
</template>

<style scoped>
.workouts-list {
  margin-top: 20px;
}
</style>
