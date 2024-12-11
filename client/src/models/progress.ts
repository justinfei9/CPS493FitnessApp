import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myfetch'

export async function getAll() {
  return api<DataListEnvelope<Progress>>('progress')
}

export async function getById(id: number) {
  return api<DataEnvelope<Progress>>(`progress/${id}`)
}

export function create(progress: Progress) {
  return api<DataEnvelope<Progress>>('progress', progress)
}

export function update(progress: Progress) {
  return api<DataEnvelope<Progress>>(`progress/${progress.id}`, progress, 'PATCH')
}

export function remove(id: number) {
  return api<DataEnvelope<Progress>>(`progress/${id}`, undefined, 'DELETE')
}

export interface Progress {
  user_handle: string
  weight: number
  date: string // timestamp in string format (ISO 8601)
  id: number
  created_at: string // timestamp of record creation
  updated_at: string // timestamp of last update
}
