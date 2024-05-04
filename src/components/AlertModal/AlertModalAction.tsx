import React from "react";
import { AlertDialogActionProps, Action } from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export interface AlertModalActionProps
  extends AlertDialogActionProps,
    React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const AlertModalAction = ({
  children,
  className,
  ...props
}: AlertModalActionProps) => {
  return (
    <Action asChild {...props} className={cn(className)}>
      {children}
    </Action>
  );
};

export default AlertModalAction;
