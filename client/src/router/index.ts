import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Statistics from '@/pages/Statistics.vue'
import FriendsActivity from '@/pages/FriendsActivity.vue'
import PeopleSearch from '@/pages/PeopleSearch.vue'
import SignUp from '@/pages/Signup.vue'
import Users from '@/pages/users/index.vue'
import workout from '@/pages/workouts/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/log-in',
    name: 'Login',
    component: Login
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/friends-activity',
    name: 'FriendsActivity',
    component: FriendsActivity
  },
  {
    path: '/people-search',
    name: 'PeopleSearch',
    component: PeopleSearch
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/workout',
    name: 'Workout',
    component: workout
  }
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router
