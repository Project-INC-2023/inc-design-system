"use client"
import React, { FC } from 'react'
import { Loader2, LucideProps } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SpinnerProps extends LucideProps {
  size?: number,
  color?: string
}

const Spinner: FC<SpinnerProps> = ({ className, size=24,color='white', ...props }) => {
  return (
    
    <div className={cn('mr-2 h-12 w-12 relative', className)}>
    <div className={cn('absolute inset-0 flex justify-center items-center animate-spin')}>
      <Loader2 {...props} color={color} size={size}  />
    </div>
  </div>
   
  )
}

export {Spinner, SpinnerProps} ;