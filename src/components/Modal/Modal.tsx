import React, { ReactElement, forwardRef, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Info, CircleX, CircleAlert, CircleCheck, X } from "lucide-react";

interface ModalProps
  extends Dialog.DialogProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface ModalCloserProps
  extends Dialog.DialogCloseProps,
    React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface ModalContentProps
  extends Dialog.DialogPortalProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closable?: boolean;
}

interface ModalTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Dialog.DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Dialog.DialogTitleProps {
  children: React.ReactNode;
  className?: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
}

const Modal = ({ children, ...props }: ModalProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
};

const ModalCloser = ({ children, className, ...props }: ModalCloserProps) => {
  return (
    <Dialog.Close asChild {...props} className={cn(className)}>
      {children}
    </Dialog.Close>
  );
};

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, className, closable, ...props }, forwardedRef) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          {...props}
          ref={forwardedRef}
          className={cn(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[80vw] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",
            className
          )}
        >
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

const ModalTitle = React.forwardRef<HTMLDivElement, ModalTitleProps>(
  ({ children, className, description, status, ...props }) => {
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
      <div className={className}>
        <Dialog.Title className="text-text-default text-lg font-bold flex flex-row items-center">
          {status && <div className="mr-2">{getStatusIcon(status)}</div>}
          {children}
        </Dialog.Title>
        {description && (
          <Dialog.Description
            className={cn(
              "text-mauve11 mt-0.5 mb-5 text-sm text-grey-400 leading-normal flex flex-row items-center"
            )}
          >
            {status && (
              <div className="mr-2 invisible">{getStatusIcon(status)}</div>
            )}
            {description}
          </Dialog.Description>
        )}
      </div>
    );
  }
);

const ModalTrigger = ({ children, className, ...props }: ModalTriggerProps) => {
  return (
    <Dialog.Trigger className={cn(className, "")} {...props} asChild>
      {children}
    </Dialog.Trigger>
  );
};

export { Modal, ModalCloser, ModalContent, ModalTrigger, ModalTitle };
