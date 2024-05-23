import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Clock4 } from "lucide-react";

export interface BadgeProps
  extends VariantProps<typeof badgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const badgeVariants = cva("text-xs rounded-full", {
  variants: {
    variant: {
      default: "bg-grey-300 text-white ",
      success: "bg-success text-white",
      error: "bg-danger text-white",
      warning: "bg-warning text-white",
      info: "bg-info text-white",
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      translucent: "bg-grey-300 text-grey-500",
      primaryAccent: " bg-primary-accent text-primary",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      className,
      variant,
    },
    forwardRef
  ) => {
    return (
    
        <div
          className={cn(
            badgeVariants({ variant }),
            className,
            "items-center justify-center inline-flex rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-grey-200 focus:ring-offset-2"
          )}
        >
          {children}
        </div>
     
    );
  }
);

export default Badge;
