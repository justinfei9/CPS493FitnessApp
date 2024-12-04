import data from '../data/users.json'
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { rest } from './myfetch'

export async function getAll() {
  return rest<DataListEnvelope<User>>('http://localhost:3000/api/v1/Users')
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
