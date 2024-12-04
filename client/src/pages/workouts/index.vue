<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WorkoutCard from '../../components/WorkoutCard.vue'
import { ref } from 'vue'
import type { Workout } from '@/models/workout'

const workouts = ref<Workout[]>([])
console.log('workoutcard loaded')
</script>
<template>
  <div class="container">
    <h1 class="title has-text-centered">Workouts</h1>

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
