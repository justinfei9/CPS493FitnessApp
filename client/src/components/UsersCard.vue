<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/models/users'
import EditUserForm from '@/components/EditUserForm.vue'

// Props for single user row data
const props = defineProps<{
  user: User
}>()

const emit = defineEmits(['edit', 'delete'])

// Local state for the edit form
const isEditModalVisible = ref(false)
const editedUser = ref<User | null>(null)

// Show the edit modal
const handleEdit = () => {
  editedUser.value = { ...props.user } // Copy the user data for editing
  isEditModalVisible.value = true // Show the edit form
}

// Delete user
const handleDelete = () => {
  emit('delete', props.user.handle) // Emit the user's handle for deletion
}

// Handle form submission from EditUserForm
const handleFormSubmit = (updatedUser: User) => {
  emit('edit', updatedUser) // Emit the updated user data
  isEditModalVisible.value = false // Hide the edit form
}

// Handle cancel action
const handleCancel = () => {
  isEditModalVisible.value = false // Hide the edit form on cancel
}
</script>

<template>
  <tr>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.handle }}</td>
    <td>
      <span class="tag" :class="user.isAdmin ? 'is-success' : 'is-warning'">
        {{ user.isAdmin ? 'Admin' : 'User' }}
      </span>
    </td>
    <td>
      <button class="button is-small is-primary mr-1" @click="handleEdit">
        <i class="fas fa-edit"></i>
      </button>
      <button class="button is-small is-danger ml-1" @click="handleDelete">
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>

  <!-- Edit User Form -->
  <EditUserForm
    v-if="isEditModalVisible"
    :user="editedUser!"
    @submit="handleFormSubmit"
    @cancel="handleCancel"
  />
</template>
