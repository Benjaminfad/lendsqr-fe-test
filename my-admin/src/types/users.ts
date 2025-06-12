export interface User {
  id: number
  organization: string
  username: string
  email: string
  phoneNumber: string
  dateJoined: string
  status: "Active" | "Inactive" | "Pending" | "Blacklisted"
}

export interface UserDetails extends User {
  firstName: string
  lastName: string
  avatar?: string
  accountNumber: string
  tier: number
  balance: string
  bank: string
  personalInfo: {
    fullName: string
    phoneNumber: string
    email: string
    bvn: string
    gender: string
    maritalStatus: string
    children: string
    typeOfResidence: string
  }
  education: {
    level: string
    employmentStatus: string
    sector: string
    duration: string
    officeEmail: string
    monthlyIncome: string
    loanRepayment: string
  }
  socials: {
    twitter: string
    facebook: string
    instagram: string
  }
  guarantor: {
    fullName: string
    phoneNumber: string
    email: string
    relationship: string
  }
}
