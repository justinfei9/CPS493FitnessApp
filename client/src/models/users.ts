import data from '../data/users.json'
import type { DataEnvelope } from './dataEnvelope'

export function getAll(): DataEnvelope<User> {
  return {
    data: data.users,
    error: ''
  }
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
