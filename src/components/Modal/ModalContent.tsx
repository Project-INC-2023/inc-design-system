import React, { forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Info, CircleX, CircleAlert, CircleCheck, X } from "lucide-react";

export interface ModalContentProps
  extends Dialog.DialogPortalProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  status?: "success" | "error" | "warning" | "info";
  closable?: boolean;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { children, title, description, className, status, closable, ...props },
    forwardedRef
  ) => {
    const getStatusIcon = (
      status: "success" | "error" | "warning" | "info" | undefined
    ): React.ReactNode => {
      switch (status) {
        case "success":
          return <CircleCheck className="text-success text-sm" />;
        case "error":
          return <CircleX className="text-danger text-sm" />;
        case "warning":
          return <CircleAlert className="text-warning text-sm" />;
        case "info":
          return <Info className="text-info text-sm" />;
        default:
          return null;
      }
    };

    return (
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          {...props}
          ref={forwardedRef}
          className={cn(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",
            className
          )}
        >
          {title && (
            <Dialog.Title className="text-text-default text-lg font-bold flex flex-row items-center">
              {status && <div className="mr-2">{getStatusIcon(status)}</div>}
              {title}
            </Dialog.Title>
          )}

          {description && (
            <Dialog.Description className={cn("text-mauve11 mt-0.5 mb-5 text-sm text-grey-400 leading-normal", status ? "ml-2":"m-0")}>
              {description}
            </Dialog.Description>
          )}

          {closable && (
            <Dialog.Close className="absolute top-0 right-0 p-3">
              <X className="text-grey-400 text-sm m-2" />
            </Dialog.Close>
          )}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);

export default ModalContent;
