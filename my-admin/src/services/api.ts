// API service for making HTTP requests
export const API_URL = {
  LOGIN: "https://run.mocky.io/v3/cce633ca-e55e-4ebe-ab8a-34069abff347",
  USERS: "https://run.mocky.io/v3/be23b2a7-0979-4731-aa74-3f3badbe53d2", // Mock API with 500 users
  USER_DETAILS: "https://run.mocky.io/v3/03fef00b-3dfd-4144-acab-1e0f194ad6ec", // Mock API for user details
}

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function postData<T>(url: string, data: any): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json() as Promise<T>
}
