export type UserStatus = "Active" | "Inactive" | "Pending" | "Blacklisted"

export interface User {
  email: any
  username: any
  id: number
  organization: string
  firstName: string
  lastName: string
  phoneNumber: string
  dateJoined: string
  status: UserStatus
}

export interface UserDetails {
  id: number
  organization: string
  firstName: string
  lastName: string
  avatar?: string
  accountNumber: string
  tier: number
  balance: string
  bank: string
  status: UserStatus
  fullName: string
  phoneNumber: string
  email: string
  bvn: number
  gender: string
  maritalStatus: string
  children: string
  typeOfResidence: string
  educationLevel: string
  employmentStatus: string
  employmentSector: string
  employmentDuration: string
  officeEmail: string
  monthlyIncome: string
  loanRepayment: string
  twitter: string
  facebook: string
  instagram: string
  guarantorName: string
  guarantorPhone: string
  guarantorEmail: string
  guarantorRelationship: string
}
