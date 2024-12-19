import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myfetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('users')
}
export async function getById(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`)
}
export function create(user: User) {
  return api<DataEnvelope<User>>('users', user)
}
export function update(user: User) {
  return api<DataEnvelope<User>>(`users/${user.id}`, user, 'PATCH')
}
export function remove(id: number) {
  return api<DataEnvelope<User>>(`users/${id}`, undefined, 'DELETE')
}
export async function search(query: string) {
  return api<DataListEnvelope<User>>(`users/search?query=${query}`)
}

export interface User {
  firstName: string
  lastName: string
  email: string
  handle: string
  isAdmin: boolean
  password: string
  id: number
}
