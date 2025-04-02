import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date for display
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Format time for display
export const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':')
  const date = new Date()
  date.setHours(Number.parseInt(hours, 10))
  date.setMinutes(Number.parseInt(minutes, 10))

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Optional utility to validate token if needed
export function isValidToken(token: string): boolean {
  // Implement token validation logic
  // For example, check if token is in correct format or not expired
  // This depends on your token structure

  try {
    // Basic validation - you might need more sophisticated checks
    if (!token || token.trim() === '') {
      return false
    }

    // If using JWT, you could check token structure
    const parts = token.split('.')
    return parts.length === 3

    // For more advanced validation:
    // - Check expiration (if stored in token)
    // - Verify signature (if possible client-side)
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}
