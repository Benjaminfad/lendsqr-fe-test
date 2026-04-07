import { fetchData } from "./api"
import { API_URL } from "./api"
import type { User, UserDetails } from "../types/users"

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetchData<UserDetails[]>(API_URL.USERS)

    if (!Array.isArray(response)) {
      return []
    }

    return response.map(
      ({
        id,
        organization,
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        dateJoined,
        status,
        Savings,
        Loan,
      }) => ({
        id,
        organization,
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        dateJoined,
        status,
        Savings,
        Loan,
      }),
    )
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

export const getUserById = async (id: string): Promise<UserDetails | null> => {
  try {
    const response = await fetchData<UserDetails[]>(API_URL.USERS)
    const user = Array.isArray(response) ? response.find((item) => item.id.toString() === id) || null : null

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

