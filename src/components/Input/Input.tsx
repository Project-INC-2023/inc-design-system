"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const inputVariants = cva(
  cn([
    "flex w-full text-text-default rounded-lg bg-white border border-grey-300 focus-visible:border-primary-active placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-grey-100",
    "ring-offset-primary-accent focus-visible:ring-2 ring-transparent focus-visible:ring-offset-2 transition-colors",
  ]),
  {
    variants: {
      variant: {
        sm: "h-8 rounded-[4px] px-2 py-[1px] text-sm",
        md: "h-8 px-3 py-[5px] text-sm",
        lg: "h-10 px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "md",
    },
  }
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  type?: "password";
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, variant, type, ...props }, ref) => {
    const [show, setShow] = React.useState<boolean>(false);
    const VisibilityIcon = show ? EyeIcon : EyeOffIcon;
    return (
      <>
        {type === "password" ? (
          <div className={cn(["relative", containerClassName])}>
            <input
              type={show ? "text" : type}
              className={cn(inputVariants({ variant, className }))}
              ref={ref}
              {...props}
            />
            {type === "password" && (
              <button
                onClick={() => setShow(!show)}
                className="absolute right-2 -translate-y-1/2 top-1/2"
              >
                <VisibilityIcon
                  className={cn([
                    "stroke-2 stroke-grey-500",
                    variant === "sm" ? "h-[14px]" : "h-[16px]",
                  ])}
                />
              </button>
            )}
          </div>
        ) : (
          <input
            type={show ? "text" : type}
            className={cn(inputVariants({ variant, className }))}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
