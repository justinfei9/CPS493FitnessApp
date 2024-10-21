<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { getAllWorkout, type Workout } from '@/models/workout'
import WorkoutCard from '../../components/WorkoutCard.vue'

const workouts = ref<Workout[]>([])
workouts.value = getAllWorkout().data
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Workouts</h1>
    <button class="button is-primary has-text-white">
      <i class="fas fa-plus icon-margin"></i> Add Workout
    </button>
    <div class="workouts-list">
      <WorkoutCard v-for="workout in workouts" :key="workout.id" :workout="workout" />
    </div>
  </div>
</template>
