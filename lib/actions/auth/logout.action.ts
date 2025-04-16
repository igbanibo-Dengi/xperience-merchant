'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logOutAction() {
  // Remove the auth token cookie
  const cookieStore = await cookies()
  cookieStore.delete('xperience_auth_token')

  // Redirect to the home page or login page
  redirect('/sign-in')
}
