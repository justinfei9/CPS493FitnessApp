export interface DataEnvelope<T> {
  data: T[]
  error: string
  total?: number
}

export interface DataEnvelopeList<T> {
  data: T[]
  error?: string
}
