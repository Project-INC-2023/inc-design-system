'use client'

import React, { FC } from 'react'
import { Loader2, LucideProps } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SpinnerProps extends LucideProps {}

const Spinner: FC<SpinnerProps> = ({ className, ...props }) => {
  return (
    
    <div className={cn('mr-2 h-12 w-12 relative', className)}>
    <div className={cn('absolute inset-0 flex justify-center items-center animate-spin')}>
      <Loader2 {...props} />
    </div>
  </div>
   
  )
}

export default Spinner;