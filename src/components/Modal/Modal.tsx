import React, { ReactElement, forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export interface ModalProps extends Dialog.DialogProps {
  children: React.ReactNode;
}

const Modal = React.forwardRef<ModalProps>(
  ({ children, ...props }, forwardRef) => {
    return (
        <Dialog.Root>{children}</Dialog.Root>
    );
  }
);

export default Modal;
// const Modal = forwardRef<Dialog.DialogProps, any>(({ children, ...props }, ref) => {
//   return <Dialog.Root {...props} ref={ref}>{children}</Dialog.Root>; // });

// export default Modal;
