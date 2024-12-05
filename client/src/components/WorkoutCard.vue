<script setup lang="ts">
import { getAll, type User } from '@/models/users'
import type { Workout } from '@/models/workout'
import { computed, ref, type Ref } from 'vue'

const props = defineProps<{
  workout: Workout
}>()

const users = ref<User[]>([])
getAll().then((data) => (users.value = data.data))

// Find the user associated with this workout
const user = computed(() => {
  return users.value.find((u) => u.handle === props.workout.userHandle) || null
})
const loggedInUser: Ref<User | null> = ref(window.loggedInUser)
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
      <p v-else-if="loggedInUser">
        {{ loggedInUser.firstName }} {{ loggedInUser.lastName }} ({{ loggedInUser.handle }})
      </p>
      <p v-else><strong>User:</strong> Not found</p>
    </div>
  </div>
</template>

<style scoped></style>
