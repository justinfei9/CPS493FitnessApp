<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { getAll, search, type User } from '@/models/users'
import UsersCard from '@/components/UsersCard.vue'
import UserForm from '@/components/UserForm.vue'
import type { OptionsPropItem } from '@oruga-ui/oruga-next'

const loggedInUser = ref<User | null>(window.loggedInUser)
const users = ref<User[]>([])

// Toggle to show/hide the add user form
const isAddingUser = ref(false)
const selected = ref('')
//options should  use getALL to get search

// Fetch users data
onMounted(async () => {
  const result = await getAll()
  users.value = result.data
})

// Check if the user is logged in and is an admin
const isAdminUser = computed(() => loggedInUser.value?.isAdmin || false)

// Function to add a new user to the list
function addUser(user: User) {
  users.value.push(user)
  isAddingUser.value = false // Close the form after adding
}

// Update a specific user in the list
function updateUser(updatedUser: User) {
  const index = users.value.findIndex((user) => user.id === updatedUser.id) // Find user by ID
  if (index !== -1) {
    users.value[index] = { ...users.value[index], ...updatedUser } // Update user details, including handle
  }
}
const options = ref<OptionsPropItem<User>[]>([])

async function getAsyncData(query: string) {
  const data = await search(query)
  options.value = data.data.map((user: User) => {
    return {
      label: user.handle,
      value: user
    }
  })
}

// Function to delete a user from the list
function deleteUser(userHandle: string) {
  users.value = users.value.filter((user) => user.handle !== userHandle)
}
</script>

<template>
  <div class="container">
    <h1 class="title has-text-centered">Users</h1>

    <!-- Conditional rendering based on user's admin status -->
    <div v-if="isAdminUser">
      <section>
        <o-field label="Find a User">
          <o-autocomplete
            v-model="selected"
            :options="options"
            :debounce="500"
            @input="getAsyncData"
            @selected="selected = $event"
            rounded
            expanded
            placeholder="e.g. user handle"
            icon="search"
            clearable
            open-on-focus
          >
            <template #empty>No results found</template>
          </o-autocomplete>
        </o-field>

        <p><b>Selected:</b> {{ selected }}</p>
      </section>
      <button class="button is-primary has-text-white" @click="isAddingUser = true">
        <i class="fas fa-plus icon-margin"></i> Add User
      </button>
      <UserForm v-if="isAddingUser" @submit="addUser" @cancel="isAddingUser = false" />

      <table class="table is-bordered is-hoverable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Handle</th>
            <th>ID</th>
            <th>Role</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          <!-- Listen for both edit and delete events from UsersCard -->
          <UsersCard
            v-for="user in users"
            :key="user.handle"
            :user="user"
            @edit="updateUser"
            @delete="deleteUser"
          />
        </tbody>
      </table>
    </div>

    <div v-else>
      <p class="has-text-danger">You do not have permission to view this content.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 2rem;
}
.table td {
  padding-right: 5rem;
}
.table td button {
  margin-right: 0.5rem;
}
.icon-margin {
  margin-right: 0.5rem;
}
</style>
