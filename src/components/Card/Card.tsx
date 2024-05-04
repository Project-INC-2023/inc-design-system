"use client"
import React from "react";
import { cn } from "../../lib/utils"; 


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "small" | "medium" | "large" | string; 
}


const Card: React.FC<CardProps> = ({
  className,
  size = "medium",
  ...props
}) => {
  // Define the size classes based on the size prop
  const sizeClasses: { [key: string]: string } = {
    small: "w-64",
    medium: "w-72", 
    large: "w-96",
  };

  return (
    <div
      className={cn(
        "rounded-lg border text-text-default bg-background shadow-sm mt-4 mb-4", 
        sizeClasses[size], // Apply size class based on the size prop
        className
      )}
      {...props}
    >
    </div>
  );
};
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1 p-4", className)}
        {...props}
      />
    )
  );
  CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative" ref={ref}>
      <h3
        className={cn(
          "text-2xl font-semibold leading-none tracking-tight text-text-default", 
          className
        )}
        {...props}
      />
    </div>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground text-text-default", className)} 
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 text-text-default", className)} {...props} /> 
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0 text-text-default", className)} 
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardProps,
};
