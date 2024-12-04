<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import WorkoutCard from '@/components/WorkoutCard.vue'
import WorkoutForm from '@/components/WorkoutForm.vue'
import { getAll } from '@/models/workout'
import type { Workout } from '@/models/workout'

const workouts = ref<Workout[]>([])
const isFormOpen = ref(false)
const loggedInUser = ref(window.loggedInUser)

onMounted(async () => {
  const response = await getAll()
  workouts.value = response.data // Access the 'data' property from the response
})
const userWorkouts = computed(() => {
  return workouts.value.filter((workout) => workout.userHandle === loggedInUser.value.handle)
})

const openWorkoutForm = () => {
  isFormOpen.value = true
}

const addWorkout = (newWorkout: Workout) => {
  newWorkout.userHandle = loggedInUser.value.handle
  workouts.value.unshift(newWorkout)
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
