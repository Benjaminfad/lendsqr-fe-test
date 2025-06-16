import type React from "react"
import "./StatCard.scss"

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  iconBgColor: string
}

const StatCard = ({ icon, title, value, iconBgColor }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ backgroundColor: iconBgColor }}>
        {icon}
      </div>
      <div className="stat-card-title">{title}</div>
      <div className="stat-card-value">{value}</div>
    </div>
  )
}

export default StatCard
