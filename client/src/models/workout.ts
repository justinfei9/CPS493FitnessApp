// models/workouts.ts
import data1 from '../data/workouts.json'
import data2 from '../data/users.json'
import type { DataEnvelope } from './dataEnvelope'
import type { User } from './users'

export function getAllUsers(): DataEnvelope<User> {
  return {
    data: data2.users,
    error: ''
  }
}
export function getAllWorkout(): DataEnvelope<Workout> {
  return {
    data: data1.workouts,
    error: ''
  }
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
