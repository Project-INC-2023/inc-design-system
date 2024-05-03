import React, { ReactElement, forwardRef, ReactNode } from "react";
import { Root, DialogProps } from "@radix-ui/react-dialog";

export interface ModalProps
  extends DialogProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Modal = ({ children, ...props }: ModalProps) => {

  return <Root {...props}>{children}</Root>;
};

export default Modal;
// const Modal = forwardRef<Dialog.DialogProps, any>(({ children, ...props }, ref) => {
//   return <Dialog.Root {...props} ref={ref}>{children}</Dialog.Root>; // });

// export default Modal;
