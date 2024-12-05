// models/workouts.ts
import data1 from '../data/workouts.json'
import data2 from '../data/users.json'
import type { DataListEnvelope } from './dataEnvelope'
import type { User } from './users'
import { rest } from './myfetch'

export async function getAllUsers() {
  return rest<DataListEnvelope<User>>('http://localhost:3000/api/v1/users')
}
export async function getAllWorkout() {
  const response = await rest<DataListEnvelope<Workout>>('http://localhost:3000/api/v1/Workouts')
  console.log('Fetched Workouts:', response) // Add this line
  return response
}

export interface Workout {
  id: number
  title: string
  date: string
  duration: number
  location: string
  type: string
  userHandle: string
}
