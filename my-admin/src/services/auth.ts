import { fetchData } from "./api"
import { API_URL } from "./api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  email?: string
  password?: string
  status?: boolean
  message?: string
  data?: {
    id?: string
    email?: string
    name?: string
    token?: string
  }
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetchData<LoginResponse>(API_URL.LOGIN)

    // Check if credentials match the response
    const validEmail = response.email === credentials.email
    const validPassword = response.password === credentials.password

    if (validEmail && validPassword) {
      // Create user data from response
      const userData = {
        id: "1", // Default ID if not provided
        email: response.email || credentials.email,
        name: response.email?.split("@")[0] || "User", // Extract name from email if not provided
        token: "auth-token-" + Date.now(), // Generate a simple token
      }

      // Store user data in localStorage
      localStorage.setItem("lendsqr_user", JSON.stringify(userData))
      localStorage.setItem("lendsqr_token", userData.token)

      return {
        status: true,
        message: "Login successful",
        data: userData,
      }
    } else {
      return {
        status: false,
        message: "Invalid email or password",
      }
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      status: false,
      message: "An error occurred during login",
    }
  }
}

export const logout = (): void => {
  localStorage.removeItem("lendsqr_user")
  localStorage.removeItem("lendsqr_token")
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("lendsqr_token")
}

export const getCurrentUser = (): any => {
  const userStr = localStorage.getItem("lendsqr_user")
  return userStr ? JSON.parse(userStr) : null
}

