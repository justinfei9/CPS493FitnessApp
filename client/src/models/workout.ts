import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myfetch'

export async function getAll() {
  const response = await api<DataListEnvelope<Workout>>('Workout')
  return response
}
export async function getById(id: number) {
  return api<DataEnvelope<Workout>>(`Workout/${id}`)
}
export function create(user: Workout) {
  return api<DataEnvelope<Workout>>('Workout', user)
}
export function update(user: Workout) {
  return api<DataEnvelope<Workout>>(`Workout/${user.id}`, user, 'PATCH')
}
export function remove(id: number) {
  return api<DataEnvelope<Workout>>(`Workout/${id}`, undefined, 'DELETE')
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
