<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/models/users'
import EditUserForm from '@/components/EditUserForm.vue'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits(['edit', 'delete'])

// Local state for the edit form
const isEditModalVisible = ref(false)
const editedUser = ref<User | null>(null)

const handleEdit = () => {
  editedUser.value = { ...props.user } // Copy the user data for editing
  isEditModalVisible.value = true // Show the edit form
}

const handleDelete = () => {
  emit('delete', props.user.handle) // Emit the user's handle for deletion
}

// Handle submission from EditUserForm
const handleFormSubmit = (updatedUser: User) => {
  emit('edit', updatedUser) // Emit the updated user data
  isEditModalVisible.value = false // Hide the edit form
}

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
    <td>{{ user.id }}</td>
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

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.user-card:hover {
  transform: scale(1.03);
}
</style>
