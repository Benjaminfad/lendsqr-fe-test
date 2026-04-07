export const API_URL = {
  LOGIN: "/data/auth.json",
  USERS: "/data/users.json",
}

const MOCK_API_DELAY_MS = 900

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchData<T>(url: string): Promise<T> {
  const [response] = await Promise.all([fetch(url), wait(MOCK_API_DELAY_MS)])

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function postData<T>(url: string, data: any): Promise<T> {
  const [response] = await Promise.all([
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
    wait(MOCK_API_DELAY_MS),
  ])

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json() as Promise<T>
}
