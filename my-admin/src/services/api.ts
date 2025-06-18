// API service for making HTTP requests
export const API_URL = {
  LOGIN: "https://run.mocky.io/v3/cce633ca-e55e-4ebe-ab8a-34069abff347",
  USERS: "https://run.mocky.io/v3/91cd7e47-8e11-4acf-884b-bcc72f8cf185", 
  USER_DETAILS: "https://run.mocky.io/v3/03fef00b-3dfd-4144-acab-1e0f194ad6ec", 
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
