"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-grey-200 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-grey-200 bg-grey-100 text-text-default hover:bg-grey-300",
        primary:
          "border-primary-active bg-primary-accent text-primary hover:bg-primary-accent/50",
        secondary:
          "border-secondary-active bg-secondary-accent text-secondary hover:bg-secondary-accent/50",
        transparentBackground:
          "border-transparent bg-transparent text-text-default hover:bg-grey-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  closeable?: boolean; // Whether the Tag can be closed. Default is false. If true, a close button will be displayed.
  onClose?: () => void; // Callback when the Tag is closed
  icon?: React.ReactNode; // Icon to display alongside the Tag text. Default is null.
  disabled?: boolean; // Whether the Tag is disabled. Default is false.
  border?: boolean; // Whether the Tag has a border. Default is true.
}

interface CheckableTagProps extends TagProps {
  checked?: boolean; // Whether the Tag is checked by default. Default is false.
  checkedBackgroundColor?: string; // Background color when Tag is checked. Default is "#DDD2F0".
  checkedTextColor?: string; // Text color when Tag is checked. Default is "#482384".
  onClickTag?: (isChecked: boolean) => void; // Callback when the Tag is clicked
}

function Tag({
  className,
  variant,
  closeable = false,
  disabled = false,
  onClose,
  icon = null,
  border = true,
  ...props
}: TagProps) {
  return (
    <div
      className={cn(
        tagVariants({ variant }),
        className,
        `${disabled ? "cursor-not-allowed opacity-50" : ""}`,
        `${!border && "border-0"}`
      )}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {props.children}
      {closeable && (
        <button
          className={`
            ml-1 ring-offset-background rounded-full outline-none 
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            ${disabled ? "cursor-not-allowed" : ""}
          `}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClose && onClose();
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={() => onClose && onClose()}
          data-disabled={disabled}
        >
          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
}

// CheckableTag component - A tag component that can be checked. Background color changes when clicked.
function CheckableTag({
  checked = false,
  checkedBackgroundColor = "#DDD2F0",
  checkedTextColor = "#482384",
  onClickTag,
  className = "",
  variant = "transparentBackground",
  disabled = false,
  icon = null,
  border = false,
  ...restProps
}: CheckableTagProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const handleClick = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      if (onClickTag) {
        onClickTag(!isChecked);
      }
    }
  };

  return (
    <Tag
      {...restProps}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      className={cn(className, "cursor-pointer")}
      style={{
        backgroundColor: isChecked ? checkedBackgroundColor : "",
        color: isChecked ? checkedTextColor : "",
      }}
      disabled={disabled}
      variant={variant}
      icon={icon}
      border={border}
    />
  );
}

export { Tag, CheckableTag, tagVariants, TagProps, CheckableTagProps };
