"use client"

import type React from "react"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.scss'
import logo from "../../assets/logo.svg"
import loginImage from "../../assets/login-image.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await login({ email, password })

      if (response.status) {
        navigate("/dashboard")
      } else {
        // Show more detailed error message
        if (email === "admin@demo.com") {
          setError(`Invalid credentials. Try using password: admin123`)
        } else {
          setError(response.message || "Invalid email or password")
        }
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-container">
          <div className="logo">
            <img src={logo || "/placeholder.svg"} alt="Lendsqr" />
          </div>
          <div className="illustration">
            <img src={loginImage || "/placeholder.svg"} alt="Login illustration" />
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1>Welcome!</h1>
            <p className="subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>

              <div className="forgot-password">
                <a href="#">FORGOT PASSWORD?</a>
              </div>

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? "LOGGING IN..." : "LOG IN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
