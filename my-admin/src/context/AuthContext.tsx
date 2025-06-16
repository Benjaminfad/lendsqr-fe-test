"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { login as loginService, logout as logoutService, isAuthenticated, getCurrentUser } from "../services/auth"
import type { LoginCredentials, LoginResponse } from "../services/auth"

interface AuthContextType {
  isLoggedIn: boolean
  user: any
  login: (credentials: LoginCredentials) => Promise<LoginResponse>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated())
  const [user, setUser] = useState<any>(getCurrentUser())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Check authentication status on mount
    setIsLoggedIn(isAuthenticated())
    setUser(getCurrentUser())
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    setLoading(true)
    try {
      const response = await loginService(credentials)
      if (response.status && response.data) {
        setIsLoggedIn(true)
        setUser(response.data)
      }
      setLoading(false)
      return response
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const logout = () => {
    logoutService()
    setIsLoggedIn(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
