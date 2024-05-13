"use client";

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}
interface PopoverTriggerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {}
interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

const Popover = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Root>,
  PopoverProps
>((props, _ref) => <PopoverPrimitive.Root {...props} />);

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ ...props }, ref) => <PopoverPrimitive.Trigger ref={ref} {...props} />);

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "rounded-lg border border-slate-100 bg-background p-5 w-64 shadow-md outline-none",
        className
      )}
      {...props}
    >
      <PopoverPrimitive.Arrow offset={10} className="bg-inherit text-inherit" />
      {/* Render the content here */}
      {props.children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

// Export components
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
};
