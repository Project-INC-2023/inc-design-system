import React from "react";
import { Root, AlertDialogProps } from "@radix-ui/react-alert-dialog";

export interface AlertModalProps
  extends AlertDialogProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AlertModal = ({ children, ...props }: AlertModalProps) => {
  return <Root {...props}>{children}</Root>;
};

export default AlertModal;
