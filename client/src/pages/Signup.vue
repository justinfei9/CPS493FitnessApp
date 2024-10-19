<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="card-content">
              <h1 class="title has-text-centered">Sign Up</h1>
              <form @submit.prevent="handleSubmit">
                <div class="field">
                  <label class="label">Username</label>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Enter your username"
                      v-model="username"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input
                      class="input"
                      type="email"
                      placeholder="Enter your email"
                      v-model="email"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <label class="label">Password</label>
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Enter your password"
                      v-model="password"
                      required
                    />
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <button class="button is-info is-fullwidth" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
              <p class="has-text-centered">
                Already have an account? <RouterLink to="/login">Log In</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  // Handle form submission logic here
  console.log({
    username: username.value,
    email: email.value,
    password: password.value
  })

  // You can reset the fields after submission if needed
  username.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style scoped></style>
