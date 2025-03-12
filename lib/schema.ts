import * as z from 'zod'

export const signUpSchema = z
  .object({
    userType: z.string().min(1).max(9),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    companyName: z
      .string()
      .min(2, 'Company name must be at least 2 characters'),
    industry: z.string().min(1, 'Please select an industry type'),
    address: z.string().min(1, 'Please enter an address'),
    city: z.string().min(1, 'Please enter a city'),
    state: z.string().min(1, 'Please enter a state/province'),
    zipCode: z.string().min(1, 'Please enter a ZIP/postal code'),
    country: z.string().min(1, 'Please select a country'),
    // termsAccepted: z.boolean().refine((val) => val === true, {
    //   message: "You must accept the terms and conditions",
    // })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const personalDetailsSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(1, 'Please select an industry type'),
  address: z.string().min(1, 'Please enter an address'),
  city: z.string().min(1, 'Please enter a city'),
  state: z.string().min(1, 'Please enter a state/province'),
  zipCode: z.string().min(1, 'Please enter a ZIP/postal code'),
  country: z.string().min(1, 'Please select a country'),
  // termsAccepted: z.boolean().refine((val) => val === true, {
  //   message: "You must accept the terms and conditions",
  // })
})

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type PersonalDetails = z.infer<typeof personalDetailsSchema>
export type CompanyDetails = z.infer<typeof companyDetailsSchema>
export type SignInData = z.infer<typeof signInSchema>

// PAYMENT DETAILS SCHEMA

export const cardSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
})

export const billingSchema = z.object({
  useCompanyAddress: z.boolean().default(false),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
})

export const paymentFormSchema = z.object({
  card: cardSchema,
  billing: billingSchema,
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>

// EVENT SCHEMA

export const eventDetailsSchema = z.object({
  title: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Event description is required"),
  location: z.object({
    type: z.string().min(1, "Location type is required"),
    venueName: z.string().min(1, "Venue name is required"),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
  }),
  eventStartDay: z.string().min(1, "Start date is required"),
  eventEndDay: z.string().min(1, "End date is required"),
  eventStartTime: z.string().min(1, "Start time is required"),
  eventEndTime: z.string().min(1, "End time is required"),
  hashtags: z.array(z.string()).default([]),
})



export const photoSchema = z.object({
  coverPhoto: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Cover photo must be a file",
    })
    .refine((file) => file !== null, {
      message: "Cover photo is required",
    }),
  sampleFeedPhotos: z
    .array(z.any().refine((file) => file instanceof File, "Feed photo must be a file"))
    .max(4, "Maximum 4 feed photos allowed"),
})

export const experienceMomentsSchema = z
  .object({
    active: z.boolean(),
    recurrence: z.string().optional(),
    duration: z.string().optional(),
  })
  .refine(
    (data) => {
      // If active is true, both recurrence and duration must be filled
      if (data.active) {
        return !!data.recurrence && !!data.duration
      }
      return true
    },
    {
      message: "Recurrence and duration are required when Experience Moments are active",
      path: ["active"], // This will show the error at the active field level
    },
  )

export const eventFormSchema = z.object({
  eventDetails: eventDetailsSchema,
  eventImages: photoSchema,
  experienceMoments: experienceMomentsSchema,
})

export type EventFormValues = z.infer<typeof eventFormSchema>


