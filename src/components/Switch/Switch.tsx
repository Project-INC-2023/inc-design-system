"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { Check, X } from "lucide-react";

interface SwitchIconProps {
  checked: boolean;
  size: "small" | "medium" | "large";
}
const switchWrapper = cva(
  [
    "switch",
    "relative",
    "select-none",
    "inline-block",
    "duration-300",
    "ease-in-out",
    "cursor-pointer",
    "rounded-full",
    "p-1",
  ],
  {
    variants: {
      checked: {
        true: "bg-primary",
        false: "bg-gray-300",
      },
      size: {
        small: "w-8 h-4",
        medium: "w-12 h-6",
        large: "w-16 h-8",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      variantIcon: {
        true: "switch-icon",
      },
    },
    defaultVariants: {
      checked: false,
      size: "medium",
      disabled: false,
    },
  }
);

const switchButton = cva(
  [
    "switch-button",
    "absolute",
    "bg-white",
    "rounded-full",
    "shadow",
    "block",
    "transition-transform",
    "duration-300",
    "ease-in-out",
  ],
  {
    variants: {
      checked: {
        true: "translate-x-full",
        false: "translate-x-0",
      },
      size: {
        small: "w-3 h-3 top-0.5 left-0.5",
        medium: "w-4 h-4 top-1 left-1",
        large: "w-6 h-6 top-1 left-1",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: true,
        size: "small",
        className: "left-1",
      },
      {
        checked: true,
        size: "medium",
        className: "left-2.5",
      },
      {
        checked: true,
        size: "large",
        className: "left-2.5",
      },
    ],
    defaultVariants: {
      checked: false,
      size: "medium",
      disabled: false,
    },
  }
);

const SwitchIcon: React.FC<SwitchIconProps> = ({
  checked,
  size,
}: {
  checked: boolean;
  size: string;
}) => {
  const leftPosition: { [key: string]: string } = {
    small: "0.5",
    medium: "1",
    large: "1",
  };

  const rightPosition: { [key: string]: string } = {
    small: "0.5",
    medium: "1",
    large: "1",
  };

  const iconSize: { [key: string]: string } = {
    small: "w-3 h-3",
    medium: "w-5 h-5",
    large: "w-7 h-7",
  };
  return (
    <span
      className={`absolute top-0.5 ${
        checked ? `left-${leftPosition[size]}` : `right-${rightPosition[size]}`
      } ${iconSize[size]}`}
    >
      {checked ? (
        <Check className={`${iconSize[size]}`} />
      ) : (
        <X className={`${iconSize[size]} text-slate-500`} />
      )}
    </span>
  );
};

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange">,
    VariantProps<typeof switchWrapper> {
  defaultChecked?: boolean;
  variantIcon?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

function Switch({
  defaultChecked = false,
  disabled = false,
  size = "medium",
  variantIcon = false,
  onChange,
  ...props
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked); // Call the onChange callback with the updated checked state
    }
  };

  return (
    <label
      {...props}
      className={switchWrapper({
        checked: Boolean(isChecked),
        size,
        variantIcon,
      })}
    >
      <input
        type="checkbox"
        className="opacity-0 absolute"
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        aria-checked={isChecked}
      />
      <span className={switchButton({ checked: Boolean(isChecked), size })} />

      {variantIcon && (
        <SwitchIcon checked={isChecked} size={size || "medium"} />
      )}
    </label>
  );
}

export { Switch };
