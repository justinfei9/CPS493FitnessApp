<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="login-box box">
            <!-- Added 'box' class from Bulma -->
            <h1 class="title has-text-centered">Log In</h1>
            <form @submit.prevent="handleSubmit">
              <div class="field">
                <label class="label">Username or Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Enter your username or email"
                    v-model="usernameOrEmail"
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
                  <button class="button is-info is-fullwidth" type="submit">Log In</button>
                </div>
              </div>
            </form>
            <p class="has-text-centered">
              Don't have an account? <RouterLink to="/sign-up">Sign Up</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const usernameOrEmail = ref('')
const password = ref('')

const handleSubmit = () => {
  // Handle login logic here
  console.log({
    usernameOrEmail: usernameOrEmail.value,
    password: password.value
  })

  // You can reset the fields after submission if needed
  usernameOrEmail.value = ''
  password.value = ''
}
</script>

<style scoped></style>
