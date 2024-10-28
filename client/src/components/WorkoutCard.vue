<script setup lang="ts">
import { getAll, type User } from '@/models/users'
import type { Workout } from '@/models/workout'
import { computed } from 'vue'

const props = defineProps<{
  workout: Workout
}>()

const usersEnvelope = getAll() // Fetch the data envelope
const users = usersEnvelope.data // Extract the actual users array

// Find the user associated with this workout
const user = computed(() => {
  return users.find((u) => u.handle === props.workout.userHandle)
})
</script>

<template>
  <div class="card">
    <div class="card-content">
      <h2 class="title">{{ workout.title }}</h2>
      <p><strong>Date:</strong> {{ workout.date }}</p>
      <p><strong>Duration:</strong> {{ workout.duration }} min</p>
      <p><strong>Location:</strong> {{ workout.location }}</p>
      <p><strong>Type:</strong> {{ workout.type }}</p>
      <p v-if="user">
        <strong>User:</strong> {{ user.firstName }} {{ user.lastName }} ({{ user.handle }})
      </p>
      <p v-else><strong>User:</strong> Not found</p>
    </div>
  </div>
</template>

<style scoped></style>
