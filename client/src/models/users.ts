import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myfetch'

export async function getAll() {
  return api<DataListEnvelope<User>>('Users')
}
export async function getById(id: number) {
  return api<DataEnvelope<User>>(`Users/${id}`)
}
export function create(user: User) {
  return api<DataEnvelope<User>>('Users', user)
}
export function update(user: User) {
  return api<DataEnvelope<User>>(`Users/${user.id}`, user, 'PATCH')
}
export function remove(id: number) {
  return api<DataEnvelope<User>>(`Users/${id}`, undefined, 'DELETE')
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
