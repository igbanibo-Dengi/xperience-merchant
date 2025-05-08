import { CompanyDetails, PersonalDetails, SignInData } from '@/lib/schema'

export interface signIn {
  email: string
  password: string
}

export interface SignInFormProps {
  onSubmit: (data: SignInData) => void
  isLoading: boolean
}

export interface PersonalDetailsFormProps {
  onSubmit: (data: PersonalDetails) => void
}

export interface CompanyDetailsFormProps {
  onSubmit: (data: CompanyDetails) => void
  onBack: () => void
  isLoading: boolean
}

export interface AuthResponse {
  token: string
  user?: {
    id: string
    fullName: string
    email: string
    phoneNumber: string
    userType: string
    companyName: string
    address: string
    industry: string
  }
}

export interface UserSettings {
  pushNotification: boolean
  mode: string
}

export interface LoggedInUser {
  settings: UserSettings
  isProfileComplete: boolean
  _id: string
  fullName: string
  email: string
  phoneNumber: string
  userType: string
  companyName: string
  address: string
  industry: string
  createdAt: string
  updatedAt: string
}

export interface signUpData {
  email: string
  fullName: string
  password: string
  confirmPassword: string
  industry: string
  address: string
  companyName: string
  city: string
  state: string
  country: string
  zipCode: string
  termsAccepted: boolean
}
