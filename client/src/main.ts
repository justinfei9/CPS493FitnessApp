import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import type { User } from './models/users'

declare global {
  interface Window {
    loggedInUser: User
  }
}

window.loggedInUser = {
  firstName: 'test',
  lastName: 'test',
  email: 'test.test@example.com',
  handle: '@test',
  isAdmin: false,
  password: 'password123'
}
const app = createApp(App)

app.use(router)
app.mount('#app')
