import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import type { User } from './models/users'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/theme-bulma/dist/bulma.css'

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
  password: 'password123',
  id: 1
}
const app = createApp(App)
app.use(Oruga)
app.use(router)
app.mount('#app')
