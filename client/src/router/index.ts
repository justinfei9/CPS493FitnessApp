import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Statistics from '@/pages/Statistics.vue'
import PeopleSearch from '@/pages/PeopleSearch.vue'
import SignUp from '@/pages/Signup.vue'
import Users from '@/pages/users/index.vue'
import workout from '@/pages/workouts/index.vue'
import MyActivity from '@/pages/MyActivity.vue'
import AdminUsers from '@/pages/admin/users/index.vue'
import AdminEditUser from '@/pages/admin/users/edit_[[id]].vue'
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
  },
  {
    path: '/my-activity',
    name: 'activity',
    component: MyActivity
  },
  // Add more routes as needed
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers
  },
  {
    path: '/admin/users/edit_:id?',
    name: 'AdminEditUser',
    component: AdminEditUser,
    props: true // Pass route params as props to the component
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router
