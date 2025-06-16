"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Star } from "react-feather"
import { getUserById } from "../../services/user"
import type { UserDetails as UserDetailsType , UserStatus } from "../../types/users"
import "./UserDetails.scss"

const UserDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("general")
  const [user, setUser] = useState<UserDetailsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) return

      try {
        setLoading(true)

        const cachedUser = localStorage.getItem(`user_${id}`)

        if (cachedUser) {
          setUser(JSON.parse(cachedUser))
          setLoading(false)
        }

        const userData = await getUserById(id)

        if (userData) {
          setUser(userData)
        } else if (!cachedUser) {
          setError("User not found. Please check if the user ID is correct.")
        }
      } catch (err) {
        console.error("Error fetching user details:", err)
        if (!localStorage.getItem(`user_${id}`)) {
          setError("Failed to load user details. Please try again later.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [id])

  const handleBlacklistUser = () => {
    if (!user || !id) return

    const updatedUser: UserDetailsType = {
      ...user,
      status: "Blacklisted" as UserStatus,
    }

    localStorage.setItem(`user_${id}`, JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const handleActivateUser = () => {
    if (!user || !id) return

    const updatedUser: UserDetailsType = {
      ...user,
      status: "Active" as UserStatus,
    }

    localStorage.setItem(`user_${id}`, JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  if (loading) {
    return <div className="loading-state">Loading user details...</div>
  }

  if (error || !user) {
    return (
      <div className="error-state">
        <p>{error || "User not found"}</p>
        <button className="btn btn-primary" onClick={() => navigate("/users")}>
          Back to Users
        </button>
      </div>
    )
  }

  return (
    <div className="user-details-page">
      <Link to="/users" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <h1>User Details</h1>

        <div className="action-buttons">
          <button
            className="btn btn-outline btn-danger"
            onClick={handleBlacklistUser}
            disabled={user.status === "Blacklisted"}
          >
            BLACKLIST USER
          </button>
          <button
            className="btn btn-outline btn-success"
            onClick={handleActivateUser}
            disabled={user.status === "Active"}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className="user-summary-card">
        <div className="user-profile-section">
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
            ) : (
              <div className="avatar-placeholder">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            )}
          </div>

          <div className="user-name-section">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.accountNumber}</p>
          </div>

          <div className="user-tier-section">
            <p>User's Tier</p>
            <div className="stars">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill={star <= user.tier ? "#E9B200" : "none"}
                  stroke={star <= user.tier ? "#E9B200" : "#E9B200"}
                />
              ))}
            </div>
          </div>

          <div className="user-balance-section">
            <h3>{user.balance}</h3>
            <p>{user.bank}</p>
          </div>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
            General Details
          </button>
          <button
            className={`tab ${activeTab === "documents" ? "active" : ""}`}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button className={`tab ${activeTab === "bank" ? "active" : ""}`} onClick={() => setActiveTab("bank")}>
            Bank Details
          </button>
          <button className={`tab ${activeTab === "loans" ? "active" : ""}`} onClick={() => setActiveTab("loans")}>
            Loans
          </button>
          <button className={`tab ${activeTab === "savings" ? "active" : ""}`} onClick={() => setActiveTab("savings")}>
            Savings
          </button>
          <button className={`tab ${activeTab === "app" ? "active" : ""}`} onClick={() => setActiveTab("app")}>
            App and System
          </button>
        </div>
      </div>

      <div className="user-details-content">
        {activeTab === "general" && (
          <>
            <div className="details-section">
              <h3>Personal Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>FULL NAME</label>
                  <p>{user.fullName}</p>
                </div>
                <div className="detail-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.phoneNumber}</p>
                </div>
                <div className="detail-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.email}</p>
                </div>
                <div className="detail-item">
                  <label>BVN</label>
                  <p>{user.bvn}</p>
                </div>
                <div className="detail-item">
                  <label>GENDER</label>
                  <p>{user.gender}</p>
                </div>
                <div className="detail-item">
                  <label>MARITAL STATUS</label>
                  <p>{user.maritalStatus}</p>
                </div>
                <div className="detail-item">
                  <label>CHILDREN</label>
                  <p>{user.children}</p>
                </div>
                <div className="detail-item">
                  <label>TYPE OF RESIDENCE</label>
                  <p>{user.typeOfResidence}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Education and Employment</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>LEVEL OF EDUCATION</label>
                  <p>{user.educationLevel}</p>
                </div>
                <div className="detail-item">
                  <label>EMPLOYMENT STATUS</label>
                  <p>{user.employmentStatus}</p>
                </div>
                <div className="detail-item">
                  <label>SECTOR OF EMPLOYMENT</label>
                  <p>{user.employmentSector}</p>
                </div>
                <div className="detail-item">
                  <label>DURATION OF EMPLOYMENT</label>
                  <p>{user.employmentDuration}</p>
                </div>
                <div className="detail-item">
                  <label>OFFICE EMAIL</label>
                  <p>{user.officeEmail}</p>
                </div>
                <div className="detail-item">
                  <label>MONTHLY INCOME</label>
                  <p>{user.monthlyIncome}</p>
                </div>
                <div className="detail-item">
                  <label>LOAN REPAYMENT</label>
                  <p>{user.loanRepayment}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Socials</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>TWITTER</label>
                  <p>{user.twitter}</p>
                </div>
                <div className="detail-item">
                  <label>FACEBOOK</label>
                  <p>{user.facebook}</p>
                </div>
                <div className="detail-item">
                  <label>INSTAGRAM</label>
                  <p>{user.instagram}</p>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Guarantor</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>FULL NAME</label>
                  <p>{user.guarantorName}</p>
                </div>
                <div className="detail-item">
                  <label>PHONE NUMBER</label>
                  <p>{user.guarantorPhone}</p>
                </div>
                <div className="detail-item">
                  <label>EMAIL ADDRESS</label>
                  <p>{user.guarantorEmail}</p>
                </div>
                <div className="detail-item">
                  <label>RELATIONSHIP</label>
                  <p>{user.guarantorRelationship}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== "general" && (
          <div className="empty-state">
            <p>Content for {activeTab} tab will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetails
