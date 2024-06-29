"use client";

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-text-light hover:bg-primary-active active:bg-primary-active disabled:bg-primary-disabled disabled:text-text-primary-disabled disabled:opacity-50",
        secondary:
          "bg-background border border-secondary text-text-default hover:text-secondary disabled:opacity-30",
        dashed:
          "bg-transparent border border-grey-300 border-dashed text-text-default hover:text-primary hover:border-primary disabled:opacity-30",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-active disabled:text-text-primary-disabled disabled:opacity-50",
        text: "bg-transparent text-text-default hover:bg-primary-accent disabled:text-text-primary-disabled disabled:opacity-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * When true, a loading spinner will be shown, and the button will be disabled.
   */
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disabled = false,
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          disabled: disabled,
        })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spinner" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, ButtonProps };
