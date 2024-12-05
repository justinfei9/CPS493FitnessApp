<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WorkoutCard from '../../components/WorkoutCard.vue'
import { ref } from 'vue'
import type { Workout } from '@/models/workout'
import { getAllWorkout } from '@/models/workout'

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
</script>
<template>
  <div class="container">
    <h1 class="title has-text-centered">Workouts!</h1>

    <!-- Show the workout form conditionally -->

    <div class="workouts-list">
      <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
    </div>
  </div>
</template>

<style scoped>
.workouts-list {
  margin-top: 20px;
}
.container h1 {
  margin-top: 20px;
}
</style>
