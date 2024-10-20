<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const isOpen = ref(false)
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

          <RouterLink to="/friends-activity" class="navbar-item">
            <i class="fa-solid fa-users"></i>Friends Activity</RouterLink
          >

          <RouterLink to="/people-search" class="navbar-item"
            ><i class="fa-solid fa-users"></i>People Search</RouterLink
          >

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Admin </a>
            <div class="navbar-dropdown">
              <RouterLink to="/Users" class="navbar-item" active-class="is-selected"
                >Users</RouterLink
              >
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <RouterLink to="/Sign-Up" class="button is-light has-text-black">
                Sign Up
              </RouterLink>
              <RouterLink to="/log-in" class="button is-light has-text-black"> Log In </RouterLink>
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
