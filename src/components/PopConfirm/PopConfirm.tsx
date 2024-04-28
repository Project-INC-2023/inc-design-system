"use client";

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../lib/utils";

 interface PopconfirmProps {
  title: React.ReactNode;
  description: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  onOpenChange,
  children,
}) => {
  const confirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content>
        <div
          className={cn(
            "rounded border border-slate-100 bg-white p-5 w-64 shadow-md outline-none"
          )}
        >
          <h2 className={cn("mt-2 mb-2 text-black font-bold")}>{title}</h2>
          <p className={cn(" text-black")}>{description}</p>
          <div className={cn("flex justify-end mt-1 space-x-2")}>
            <button
              onClick={handleCancel}
              className={cn("text-black bg-transparent mr-4")}
            >
              Cancel
            </button>
            <button
              onClick={confirm}
              className={cn("bg-purple-500 text-white p-2")}
            >
              Confirm
            </button>
          </div>
        </div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

export { Popconfirm, PopconfirmProps };
