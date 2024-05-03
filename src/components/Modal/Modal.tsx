import React, { ReactElement, forwardRef, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface ModalProps extends Dialog.DialogProps {
  children: ReactNode;
}

const Modal = ({ children, ...props }: ModalProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
};


export default Modal;
// const Modal = forwardRef<Dialog.DialogProps, any>(({ children, ...props }, ref) => {
//   return <Dialog.Root {...props} ref={ref}>{children}</Dialog.Root>; // });

// export default Modal;
