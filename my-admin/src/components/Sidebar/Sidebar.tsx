"use client"

import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  Home,
  Users,
  Users as Guarantors,
  FileText,
  Briefcase,
  Sliders,
  UserCheck,
  UserX,
  LogOut,
  ChevronDown,
} from "react-feather"
import "./Sidebar.scss"
import { useAuth } from "../../context/AuthContext"
import { BadgePercent, ChartBar, ClipboardList, Database, HandCoins, Handshake, Landmark, LoaderPinwheel, PiggyBank, Scroll, UserCog } from "lucide-react"

const Sidebar = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()
  
    const handleLogout = () => {
      logout()
      navigate("/")
    }

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar)
  }

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleMobileSidebar}>
        {showMobileSidebar ? "Close" : "Menu"}
      </button>

      <aside className={`sidebar ${showMobileSidebar ? "show" : ""}`}>
        <div className="sidebar-section">
          <div className="sidebar-item organization">
            <Briefcase size={16} />
            <span>Switch Organization</span>
            <ChevronDown size={16} />
          </div>
        </div>

        <div className="sidebar-section">
          <NavLink to="/dashboard" className="sidebar-item">
            <Home size={16} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">CUSTOMERS</div>

          <NavLink to="/users" className="sidebar-item">
            <Users size={16} />
            <span>Users</span>
          </NavLink>

          <NavLink to="/guarantors" className="sidebar-item">
            <Guarantors size={16} />
            <span>Guarantors</span>
          </NavLink>

          <NavLink to="/loans" className="sidebar-item">
            <FileText size={16} />
            <span>Loans</span>
          </NavLink>

          <NavLink to="/decision-models" className="sidebar-item">
            <Handshake size={16} />
            <span>Decision Models</span>
          </NavLink>

          <NavLink to="/savings" className="sidebar-item">
            <PiggyBank size={18} />
            <span>Savings</span>
          </NavLink>

          <NavLink to="/loan-requests" className="sidebar-item">
            <HandCoins size={16} />
            <span>Loan Requests</span>
          </NavLink>

          <NavLink to="/whitelist" className="sidebar-item">
            <UserCheck size={16} />
            <span>Whitelist</span>
          </NavLink>

          <NavLink to="/karma" className="sidebar-item">
            <UserX size={16} />
            <span>Karma</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">BUSINESSES</div>

          <NavLink to="/organization" className="sidebar-item">
            <Briefcase size={16} />
            <span>Organization</span>
          </NavLink>

          <NavLink to="/loan-products" className="sidebar-item">
            <HandCoins size={16} />
            <span>Loan Products</span>
          </NavLink>

          <NavLink to="/savings-products" className="sidebar-item">
            <Landmark size={16} />
            <span>Savings Products</span>
          </NavLink>

          <NavLink to="/fees" className="sidebar-item">
            < Database size={16} />
            <span>Fees and Charges</span>
          </NavLink>

          <NavLink to="/transactions" className="sidebar-item">
            <Sliders size={16} />
            <span>Transactions</span>
          </NavLink>

          <NavLink to="/services" className="sidebar-item">
            <Sliders size={16} />
            <span>Services</span>
          </NavLink>

          <NavLink to="/service-account" className="sidebar-item">
            <UserCog size={16} />
            <span>Service Account</span>
          </NavLink>

          <NavLink to="/settlements" className="sidebar-item">
            <Scroll size={16} />
            <span>Settlements</span>
          </NavLink>

          <NavLink to="/reports" className="sidebar-item">
            <ChartBar size={16} />
            <span>Reports</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">SETTINGS</div>

          <NavLink to="/preferences" className="sidebar-item">
            <Sliders size={16} />
            <span>Preferences</span>
          </NavLink>

          <NavLink to="/fees-pricing" className="sidebar-item">
            <BadgePercent size={16} />
            <span>Fees and Pricing</span>
          </NavLink>

          <NavLink to="/audit-logs" className="sidebar-item">
            <ClipboardList size={16} />
            <span>Audit Logs</span>
          </NavLink>

           <NavLink to="/systems-messages" className="sidebar-item">
            <LoaderPinwheel size={16} />
            <span>Systems Messages</span>
          </NavLink>
        </div>

        <div className="sidebar-section logout" onClick={handleLogout}>
          <div className="logging">
            <LogOut size={16} />
            <span>Logout</span>
          </div>
          <div className="version">v1.2.0</div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
