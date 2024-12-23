import * as z from "zod"

export const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industryType: z.string().min(1, "Please select an industry type"),
  address: z.string().min(1, "Please enter an address"),
  city: z.string().min(1, "Please enter a city"),
  stateProvince: z.string().min(1, "Please enter a state/province"),
  zipPostalCode: z.string().min(1, "Please enter a ZIP/postal code"),
  country: z.string().min(1, "Please select a country"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  })
})

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type PersonalDetails = z.infer<typeof personalDetailsSchema>
export type CompanyDetails = z.infer<typeof companyDetailsSchema>
export type SignInData = z.infer<typeof signInSchema>

// PAYMENT DETAILS SCHEMA

export const cardSchema = z.object({
  name: z.string().min(2, "Name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
})

export const billingSchema = z.object({
  useCompanyAddress: z.boolean().default(false),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
})

export const paymentFormSchema = z.object({
  card: cardSchema,
  billing: billingSchema,
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>

