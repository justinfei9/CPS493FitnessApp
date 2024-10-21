<script setup lang="ts">
import type { Workout } from '@/models/workout'

const props = defineProps<{
  workout: Workout
}>()
</script>

<template>
  <div class="card">
    <div class="card-content">
      <h2 class="title">{{ workout.title }}</h2>
      <p><strong>Date:</strong> {{ workout.date }}</p>
      <p><strong>Duration:</strong> {{ workout.duration }} min</p>
      <p><strong>Location:</strong> {{ workout.location }}</p>
      <p><strong>Type:</strong> {{ workout.type }}</p>
    </div>
  </div>
</template>

<style scoped></style>
