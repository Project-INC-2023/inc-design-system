import React, { Children } from 'react'
import {Close, DialogCloseProps} from '@radix-ui/react-dialog'

export interface ModalCloserProps extends DialogCloseProps{
  children: React.ReactNode
  className?: string
}

const ModalCloser = ({children, ...props}: ModalCloserProps) => {
  return (
    <Close asChild {...props}>
      {children}
    </Close>
  )
}

export default ModalCloser