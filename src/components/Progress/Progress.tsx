"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  isSuccess?: boolean;
  isError?: boolean;
  variant?: "default" | "isError" | "isSuccess";
  showValueInfo?: boolean;
  isCircle?: boolean; // New prop to determine if the progress bar should be circular
}

const indicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-slate-900 dark:bg-slate-400",
      isError: "bg-red-500 dark:bg-red-500",
      isSuccess: "bg-green-500 dark:bg-green-400",
    },
  },
});

// Define the default root variants
const defaultRootVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-slate-200 dark:bg-slate-800",
        isError: "bg-red-200 dark:bg-red-800",
        isSuccess: "bg-green-200 dark:bg-green-800",
      },
    },
  }
);

// Define the circular root variants
const circularRootVariants = cva(
  "relative h-24 w-24 overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-slate-200 dark:bg-slate-800",
        isError: "bg-red-200 dark:bg-red-800",
        isSuccess: "bg-green-200 dark:bg-green-800",
      },
    },
  }
);

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      isError,
      isSuccess,
      showValueInfo,
      isCircle = false, // Default to false if not provided
      ...props
    },
    ref
  ) => {
    const variant = isError ? "isError" : isSuccess ? "isSuccess" : "default";
    const rootVariants = isCircle ? circularRootVariants : defaultRootVariants;

    return (
      <div className="my-4">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(rootVariants({ variant, className }))}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(indicatorVariants({ variant }))}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
          {showValueInfo && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              {value}%
            </div>
          )}
        </ProgressPrimitive.Root>
      </div>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, ProgressProps };
