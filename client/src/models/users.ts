import data from '../data/users.json'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<User> {
  return {
    data: data.users,
    total: data.users.length,
    isSuccess: true
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
