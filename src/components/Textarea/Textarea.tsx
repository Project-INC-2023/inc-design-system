"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  showCharCount?: boolean;
  autosize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      showCharCount = false,
      autosize = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [text, setText] = React.useState<string>(
      (props.value as string) ?? ""
    );

    const handleHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight + 2}px`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);

      if (props.onChange) props.onChange(e);
      if (autosize) handleHeight(e);
    };

    return (
      <>
        {showCharCount ? (
          <div className={cn(["flex flex-col", containerClassName])}>
            <textarea
              className={cn(
                "min-h-[60px] text-sm p-2 flex w-full text-text-default rounded-lg bg-white border border-grey-300 focus-visible:border-primary-active  placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-grey-100",
                "ring-offset-primary-accent focus-visible:ring-2 ring-transparent focus-visible:ring-offset-2 transition-colors",
                autosize && "resize-none",
                className
              )}
              ref={ref}
              {...props}
              onChange={handleChange}
            />
            {showCharCount && (
              <h1 className="text-grey-400 self-end text-sm">
                {text.length}
                {props.maxLength && ` / ${props.maxLength}`}
              </h1>
            )}
          </div>
        ) : (
          <textarea
            onChange={handleChange}
            className={cn(
              "min-h-[60px] text-sm p-2 flex w-full text-text-default rounded-lg bg-white border border-grey-300 focus-visible:border-primary-active  placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-grey-100",
              "ring-offset-primary-accent focus-visible:ring-2 ring-transparent focus-visible:ring-offset-2 transition-colors",
              autosize && "resize-none",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
