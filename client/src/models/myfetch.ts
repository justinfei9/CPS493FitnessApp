export async function rest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log('REST Response:', data) // Log the raw response
    return data
  } catch (error) {
    console.error('Error in rest function:', error)
    throw error
  }
}
