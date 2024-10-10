import data from '../data/products.json'
import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Product> {
  return {
    data: data.items,
    error: '',
    total: data.total
  }
}

export interface Product {
  thumbnail: string
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  reviews: review[]
}
interface review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}
