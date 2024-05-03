import React, { Children } from 'react'
import {Close, DialogCloseProps} from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

export interface ModalCloserProps extends DialogCloseProps{
  children: React.ReactNode
  className?: string
}

const ModalCloser = ({children, className, ...props}: ModalCloserProps) => {
  return (
    <Close asChild {...props} className={cn(className)}>
      {children}
    </Close>
  )
}

export default ModalCloser