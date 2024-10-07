<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div>
    <form>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Your name" />
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Your email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" placeholder="Your message"></textarea>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
