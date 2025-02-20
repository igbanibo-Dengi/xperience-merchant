'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logOutAction() {
  // Remove the auth token cookie
  cookies().delete('auth_token')

  // Redirect to the home page or login page
  redirect('/sign-in')
}
