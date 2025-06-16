"use client"

import { useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { Search, Bell, LogOut } from "react-feather"
import { useAuth } from "../../context/AuthContext"
import "./Header.scss"
import logo from "../../assets/Logo.svg"

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/dashboard">
            <img src={logo || "/placeholder.svg"} alt="Lendsqr" />
          </Link>
        </div>

        <div className="header-search">
          <input type="text" placeholder="Search for anything" />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>

        <div className="header-actions">
          <Link to="/docs" className="docs-link">
            Docs
          </Link>
          <button className="notification-button">
            <Bell size={20} />
          </button>
          <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <span>{user?.name || "User"}</span>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L4 2.58579L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L4.70711 4.70711C4.31658 5.09763 3.68342 5.09763 3.29289 4.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                fill="#213F7D"
              />
            </svg>

            {/* {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-item">Profile</div>
                <div className="user-menu-item">Settings</div>
                <div className="user-menu-item logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </div>
            )} */}
          </div>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to="/docs" className="mobile-menu-item">
            Docs
          </Link>
          <div className="mobile-menu-item notification">
            <Bell size={20} />
            <span>Notifications</span>
          </div>
          <div className="mobile-menu-item profile">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <span>{user?.name || "User"}</span>
          </div>
           <div className="mobile-menu-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
