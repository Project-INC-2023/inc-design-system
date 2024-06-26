"use client";

import * as Component from "@radix-ui/react-accordion";
import React from "react";
import { ChevronDown } from "lucide-react";
// import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export interface Props extends Component.PrimitiveDivProps {
  // extends VariantProps<typeof accordionVariants>

  // only one can be opened at a time?
  single?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Accordion = ({
  single = false,
  disabled = false,
  children,
}: Props) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Component.Root
      type={single ? "single" : "multiple"}
      className="rounded-lg  border-1 border-grey-200"
      disabled={disabled}
    >
      {children}
    </Component.Root>
  );
};

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Component.Item
      className={cn(
        "mt-px overflow-hidden bg-white first:mt-0 first:rounded-lg-t last:rounded-xl-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]",
        className
      )}
      {...props}
      ref={forwardedRef}
      value={props.value}
    >
      {children}
    </Component.Item>
  )
);

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Component.Header className="flex">
    <Component.Trigger
      className={cn(
        "bg-grey-100 py-3 px-5 data-[state=open]:text-primary flex flex-row justify-between min-h-0 w-full group",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown
        className="data-[state=open]:text-primary ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Component.Trigger>
  </Component.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Component.Content
    className={cn(
      "bg-white animate-slideDown data-[state=open]:animate-slideDown animate-slideUp data-[state=closed]:animate-slideUp",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {/* Ensure flex container for horizontal layout */}
    <div className="flex items-center">
      {/* Simplified bg-contentBar styling */}
      <div className="bg-primary w-1 h-full rounded-full mr-2" />

      {/* Content area with overflow visible for long content */}
      <div className="py-[15px] px-4 ">{children}</div>
    </div>
  </Component.Content>
));

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
