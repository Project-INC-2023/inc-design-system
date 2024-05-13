"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

interface ProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  isSuccess?: boolean;
  isError?: boolean;
  variant?: "default" | "isError" | "isSuccess";
  showValueInfo?: boolean; 
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

const rootVariants = cva("relative h-4 w-full overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: "bg-slate-200 dark:bg-slate-800",
      isError: "bg-red-200 dark:bg-red-800",
      isSuccess: "bg-green-200 dark:bg-green-800",
    },
  },
});

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ className, value, isError, isSuccess, showValueInfo, ...props }, ref) => {
  const variant = isError ? "isError" : isSuccess ? "isSuccess" : "default";
  
   
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
});

ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar, ProgressBarProps };