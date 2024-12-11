import type { User } from './users'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myfetch'

export async function getAllWorkout() {
  return api<DataListEnvelope<Workout>>('workouts')
}
export async function getById(id: number) {
  return api<DataEnvelope<User>>(`workouts/${id}`)
}
export function create(workout: Workout) {
  return api<DataEnvelope<User>>('workouts', workout)
}
export function update(workout: Workout) {
  return api<DataEnvelope<User>>(`workouts/${workout.id}`, workout, 'PATCH')
}
export function remove(id: number) {
  return api<DataEnvelope<User>>(`workouts/${id}`, undefined, 'DELETE')
}

export interface Workout {
  id: number
  title: string
  date: string
  duration: number
  location: string
  type: string
  handle: string
}
