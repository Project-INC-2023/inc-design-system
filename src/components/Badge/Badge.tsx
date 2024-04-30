import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Clock4 } from "lucide-react";

export interface BadgeProps
  extends VariantProps<typeof badgeVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  showZero?: boolean;
  dot?: boolean;
  overflowCount?: number;
  processing?: boolean;
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
      count = 0,
      dot = false,
      showZero = false,
      overflowCount = 1000,
      processing = false,
      className,
      variant,
    },
    forwardRef
  ) => {
    return (
      <div>
        <div
          className={cn(
            className,
            "inline-flex relative",
            // visually better but kinda changes the whole padding
            dot ? "p-1" : "p-3"
          )}
        >
          <div>
            <div
              className={cn(
                className,
                "static",
                count === 0 && !showZero && !dot && !processing
                  ? "hidden"
                  : "block"
              )}
            >
              {processing ? (
                <div className="absolute top-0 right-0 ">
                  <Clock4 size={20} />
                </div>
              ) : (
                <div
                  className={cn(
                    badgeVariants({ variant }),
                    "absolute top-0 right-0 text-sm flex items-center justify-center",
                    dot
                      ? "w-3 h-3"
                      : count > 999
                      ? "w-11 h-6"
                      : count > 99
                      ? "w-8 h-6"
                      : "w-6 h-6"
                  )}
                >
                  {dot
                    ? null
                    : count > overflowCount
                    ? `${overflowCount}+`
                    : count}
                </div>
              )}
            </div>
            <div className="inline-block">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default Badge;
