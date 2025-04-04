import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader2 className='szie-[100px] animate-spin' />
    </div>
  )
}

export default LoadingSkeleton