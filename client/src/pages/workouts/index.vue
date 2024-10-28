<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WorkoutCard from '../../components/WorkoutCard.vue'
import WorkoutForm from '../../components/WorkoutForm.vue'
import { ref } from 'vue'
import type { Workout } from '@/models/workout'
import { getAllWorkout } from '@/models/workout'

const workouts = ref<Workout[]>(getAllWorkout().data)
const isFormOpen = ref(false)

const openWorkoutForm = () => {
  isFormOpen.value = true
}

const addWorkout = (newWorkout: Workout) => {
  // Add the new workout to the workouts array
  workouts.value.push(newWorkout)
  console.log('New Workout Added:', newWorkout)
  // Close the form after adding the workout
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
      <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
    </div>
  </div>
</template>

<style scoped>
.workouts-list {
  margin-top: 20px;
}
</style>
