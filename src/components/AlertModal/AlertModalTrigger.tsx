import React from 'react'
import { Trigger, DialogTriggerProps } from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export interface AlertModalTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const AlertModalTrigger = ({ children, className, ...props }: AlertModalTriggerProps) => {
    return <Trigger className={cn(className, "")} {...props} asChild>{children}</Trigger>;
  };

export default AlertModalTrigger