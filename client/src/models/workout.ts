// models/workouts.ts
import data from '../data/workouts.json'
import type { DataEnvelope } from './dataEnvelope'
import type { User } from './users'

export function getAll(): DataEnvelope<Workout> {
  return {
    data: data.workouts,
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
  user: User
}
