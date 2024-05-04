import React from 'react'
import { AlertDialogCancelProps, Cancel } from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'

export interface AlertModalCancelProps extends AlertDialogCancelProps, React.HtmlHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode
    className?: string
  }

  const AlertModalCancel = ({children, className, ...props}: AlertModalCancelProps) => {
    return (
      <Cancel asChild {...props} className={cn(className)}>
        {children}
      </Cancel>
    )
  }

export default AlertModalCancel