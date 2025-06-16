import { fetchData } from "./api"
import { API_URL } from "./api"
import type { User, UserDetails } from "../types/users"

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetchData<{ status: boolean; data: User[] }>(API_URL.USERS)
    return response.data || []
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export const getUserById = async (id: string): Promise<UserDetails | null> => {
  try {
    // Fetch all user details from the API
    const response = await fetchData<{ status: boolean; data: UserDetails[] }>(API_URL.USER_DETAILS)

    let user: UserDetails | null = null

    if (response.status && Array.isArray(response.data)) {
      // If the API returns an array of users, find the one with matching ID
      user = response.data.find((u) => u.id.toString() === id) || null
    }

    if (user) {
      // Store in localStorage for offline access
      localStorage.setItem(`user_${id}`, JSON.stringify(user))
      return user
    }

    // If user not found in API response, try localStorage
    const cachedUser = localStorage.getItem(`user_${id}`)
    if (cachedUser) {
      return JSON.parse(cachedUser)
    }

    // Return null if user not found
    return null
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)

    // Try to get from localStorage if API fails
    const cachedUser = localStorage.getItem(`user_${id}`)
    if (cachedUser) {
      return JSON.parse(cachedUser)
    }

    // Return null if user not found
    return null
  }
}

