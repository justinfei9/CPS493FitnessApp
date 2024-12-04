// models/workouts.ts
import data1 from '../data/workouts.json'
import data2 from '../data/users.json'
import type { DataListEnvelope } from './dataEnvelope'
import type { User } from './users'

export function getAllUsers(): DataListEnvelope<User> {
  return {
    data: data2.users,
    total: data2.users.length,
    isSuccess: true
  }
}
export function getAllWorkout(): DataListEnvelope<Workout> {
  return {
    data: data1.workouts,
    total: data2.users.length,
    isSuccess: true
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
