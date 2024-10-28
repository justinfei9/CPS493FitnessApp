<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { RouterLink } from 'vue-router'
import { getAll } from '@/models/users'
import type { User } from '@/models/users'

const isOpen = ref(false)
const isUserDropdownOpen = ref(false)
const users = ref<User[]>([])
const loggedInUser = ref<User | null>(null)
onMounted(() => {
  const result = getAll()
  users.value = result.data // Load users from getAll()
})

// Function to handle user login
function logInUser(user: User) {
  console.log('User Object:', user) // Log the entire user object
  loggedInUser.value = user // Log in the user
  isUserDropdownOpen.value = false // Close the dropdown after selection
  provide('loggedInUser', {
    loggedInUser,
    logInUser
  })
}

// Function to handle user logout
function logOutUser() {
  loggedInUser.value = null // Clear logged-in user
}
provide('loggedInUser', {
  loggedInUser,
  logInUser
})
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" />
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item">Home</RouterLink>

          <RouterLink to="/log-in" class="navbar-item">
            <i class="fa-solid fa-person-walking"></i> My Activity</RouterLink
          >

          <RouterLink to="/statistics" class="navbar-item">
            <i class="fa-solid fa-chart-line"></i> Statistics</RouterLink
          >

          <RouterLink to="/workout" class="navbar-item">
            <i class="fa-solid fa-users"></i>Friends Activity</RouterLink
          >

          <RouterLink to="/people-search" class="navbar-item"
            ><i class="fa-solid fa-users"></i>People Search</RouterLink
          >

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Admin </a>
            <div class="navbar-dropdown">
              <RouterLink
                v-if="loggedInUser && loggedInUser.isAdmin === true"
                to="/users"
                class="navbar-item"
                active-class="is-selected"
              >
                Users
              </RouterLink>
              <RouterLink v-else to="/log-in" class="navbar-item" active-class="is-selected">
                No Permission
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <!-- Hide Sign Up button when logged in -->
              <RouterLink v-if="!loggedInUser" to="/Sign-Up" class="button is-light has-text-black"
                >Sign Up</RouterLink
              >

              <!-- User Dropdown Menu for Login -->
              <div class="navbar-item has-dropdown is-hoverable">
                <button
                  v-if="!loggedInUser"
                  class="navbar-link button is-light"
                  @click="isUserDropdownOpen = !isUserDropdownOpen"
                >
                  Log In
                </button>

                <div class="navbar-dropdown" v-if="isUserDropdownOpen">
                  <div
                    v-for="user in users"
                    :key="user.email"
                    class="navbar-item"
                    @click="logInUser(user)"
                  >
                    {{ user.firstName }} {{ user.lastName }}
                  </div>
                </div>
              </div>

              <!-- Display logged-in user -->
              <div v-if="loggedInUser" class="navbar-item">
                <span>Howdy, {{ loggedInUser.firstName }}!</span>
                <button class="button is-light" @click="logOutUser">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  background-color: #96dffc;
}
/* Updated hover state for RouterLink */
.router-link:hover {
  font-weight: bold; /* Bold text on hover */
  background-color: #96df0c; /* Set your desired hover background color */
}

/* Optional: Add hover state for buttons */
.buttons .router-link-active {
  background-color: #dddddd; /* Change this to your desired hover color */
}
</style>
