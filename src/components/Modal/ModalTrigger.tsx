import React from "react";
import { Trigger, DialogTriggerProps } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export interface ModalTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTrigger = ({ children, className, ...props }: ModalTriggerProps) => {
  return <Trigger className={cn(className, "")} {...props} asChild>{children}</Trigger>;
};

export default ModalTrigger;
