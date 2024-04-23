"use client";

import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Check, ChevronDown } from "lucide-react";
import "../styles.css";

import { useVirtualizer } from "@tanstack/react-virtual";

import { cn } from "../../lib/utils";

//#region types
interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}
interface SelectGroupProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}
interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}
interface SelectValueProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {}
interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}
interface SelectContentTanStackVirtualProps extends SelectContentProps {
  data: { label: string; value: string }[];
}
interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}
interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
interface SelectContentTanStackVirtualItem {
  label: string;
  value: string;
}
//#endregion

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>((props, _ref) => <SelectPrimitive.Root {...props} />);

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  SelectGroupProps
>((props, _ref) => <SelectPrimitive.Group {...props} />);

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      `flex h-8 w-full items-center justify-between rounded-lg border border-grey-300 bg-white px-3 py-2 ring-offset-grey-300 placeholder:text-grey 
      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 focus:border-primary-active 
      disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-grey-100 [&>span]:line-clamp-1`,
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4" color="#98A2B3" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  SelectValueProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    className={cn("text-grey-400 placeholder:text-grey-400", className)}
    {...props}
  />
));
SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-text-default shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        position === "popper" &&
          "w-full min-w-[var(--radix-select-trigger-width)] overflow-y-auto max-h-96 inc-design-system-select-content",
        className
      )}
      position={position}
      {...props}
    >
      <ScrollArea.Root
        className="inc-design-system-select-scroll-area-root"
        type="auto"
      >
        <SelectPrimitive.Viewport className={cn("p-1")}>
          <ScrollArea.Viewport className="inc-design-system-select-scroll-area-viewport">
            {children}
          </ScrollArea.Viewport>
        </SelectPrimitive.Viewport>
        <ScrollArea.Scrollbar
          className="inc-design-system-select-scroll-area-scrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="inc-design-system-select-scroll-area-thumb" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectContentTanStackVirtual = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentTanStackVirtualProps
>(({ className, children, position = "popper", data, ...props }, ref) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div
      ref={parentRef}
      className="overflow-auto"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
    >
      <SelectContent ref={ref} className="h-96 w-full relative">
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div key={virtualItem.key}>
            <SelectItem value={data[virtualItem.index].value}>
              {data[virtualItem.index].label}
            </SelectItem>
          </div>
        ))}
      </SelectContent>
    </div>
  );
});
SelectContentTanStackVirtual.displayName = SelectContent.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-primary-accent focus:text-text-default data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" color="#98A2B3" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectContentTanStackVirtual,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectProps,
  SelectGroupProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectContentTanStackVirtualProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectContentTanStackVirtualItem,
};
