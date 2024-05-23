import React, { forwardRef } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { Info, CircleX, CircleAlert, CircleCheck, X } from "lucide-react";

export interface AlertModalProps
  extends AlertDialog.AlertDialogProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface AlertModalActionProps
  extends AlertDialog.AlertDialogActionProps,
    React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export interface AlertModalCancelProps
  extends AlertDialog.AlertDialogCancelProps,
    React.HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export interface AlertModalContentProps
  extends AlertDialog.AlertDialogContentProps,
    React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  status?: "success" | "error" | "warning" | "info";
}

export interface AlertModalTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    AlertDialog.DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface AlertModalTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AlertDialog.AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
}

export const AlertModal = ({ children, ...props }: AlertModalProps) => {
  return <AlertDialog.Root {...props}>{children}</AlertDialog.Root>;
};

export const AlertModalAction = ({
  children,
  className,
  ...props
}: AlertModalActionProps) => {
  return (
    <AlertDialog.Action asChild {...props} className={cn(className)}>
      {children}
    </AlertDialog.Action>
  );
};

export const AlertModalCancel = ({
  children,
  className,
  ...props
}: AlertModalCancelProps) => {
  return (
    <AlertDialog.Cancel asChild {...props} className={cn(className)}>
      {children}
    </AlertDialog.Cancel>
  );
};

export const AlertModalContent = forwardRef<
  HTMLDivElement,
  AlertModalContentProps
>(
  (
    { children, title, description, className, status, ...props },
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
      <AlertDialog.Portal>
        <AlertDialog.Overlay className=" bg-black bg-opacity-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content
          {...props}
          ref={forwardedRef}
          className={cn(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[80vw] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",
            className
          )}
        >
          {/* {title && (
            <AlertDialog.Title className="text-text-default text-lg font-bold flex flex-row items-center">
              {status && <div className="mr-2">{getStatusIcon(status)}</div>}
              {title}
            </AlertDialog.Title>
          )}

          {description && (
            <AlertDialog.Description
              className={cn(
                "text-mauve11 mt-0.5 mb-5 text-sm text-grey-400 leading-normal flex flex-row items-center"
              )}
            >
              {status && (
                <div className="mr-2 invisible">{getStatusIcon(status)}</div>
              )}
              {description}
            </AlertDialog.Description>
          )} */}

          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    );
  }
);

export const AlertModalTitle = forwardRef<HTMLDivElement, AlertModalTitleProps>(
  ({ children, className, description, status, ...props }, forwardedRef) => {
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
        <AlertDialog.Title className="text-text-default text-lg font-bold flex flex-row items-center">
          {status && <div className="mr-2">{getStatusIcon(status)}</div>}
          {children}
        </AlertDialog.Title>
        {description && (
          <AlertDialog.Description
            className={cn(
              "text-mauve11 mt-0.5 mb-5 text-sm text-grey-400 leading-normal flex flex-row items-center"
            )}
          >
            {status && (
              <div className="mr-2 invisible">{getStatusIcon(status)}</div>
            )}
            {description}
          </AlertDialog.Description>
        )}
      </div>
    );
  }
);

export const AlertModalTrigger = ({
  children,
  className,
  ...props
}: AlertModalTriggerProps) => {
  return (
    <AlertDialog.Trigger className={cn(className, "")} {...props} asChild>
      {children}
    </AlertDialog.Trigger>
  );
};
