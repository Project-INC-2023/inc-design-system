import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils"; // Assuming you have a similar utility function
import { VariantProps, cva } from "class-variance-authority";

const timePickerVariants = cva(
  "px-4 py-2 border rounded-md shadow-sm text-black",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },

      hourMinuteOnly: {
        true: "w-40",
        false: "w-fit",
      },

      disabled: {
        true: "bg-gray-100 text-slate-400 cursor-not-allowed",
        false: "hover:bg-primary-accent hover:text-primary-active",
      },
      twelveHour: {
        true: "12-hour",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      hourMinuteOnly: false,
      twelveHour: false,
      disabled: false,
    },
  }
);

interface Time {
  hour: string;
  minute: string;
  second: string;
  period: string;
}

export interface TimePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof timePickerVariants> {
  timeValue?: Date;
  onTimeChange?: (newTime: Date) => void;
  disabled?: boolean;
}

const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      className,
      size,
      hourMinuteOnly,
      twelveHour,
      disabled,
      timeValue,
      onTimeChange,
      ...props
    },
    ref
  ) => {
    const [time, setTime] = useState<Date>(timeValue || new Date());

    useEffect(() => {
      if (timeValue) {
        setTime(timeValue);
      }
    }, [timeValue]);

    const handleTimeChange = (
      hours: number,
      minutes: number,
      seconds: number = 0,
      isPM?: boolean
    ) => {
      const newTime = new Date(time);
      const wasPM = newTime.getHours() >= 12;

      if (twelveHour) {
        hours = (hours % 12) + ((isPM !== undefined ? isPM : wasPM) ? 12 : 0);
      }
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      newTime.setSeconds(seconds);
      setTime(newTime);
      if (onTimeChange) {
        onTimeChange(newTime);
      }
    };
    const timeOptions = (
      start: number,
      end: number,
      field: keyof Time,
      setter: (value: number, isPM?: boolean) => void,
      isPM?: boolean
    ): JSX.Element => {
      let options: JSX.Element[] = [];
      for (let i = start; i <= end; i++) {
        const isSelected =
          (field === "hour" &&
            (twelveHour
              ? (time.getHours() % 12 || 12) === i
              : time.getHours() === i)) ||
          (field === "minute" && time.getMinutes() === i) ||
          (field === "second" && time.getSeconds() === i);
        options.push(
          <button
            key={i}
            onClick={() => setter(i, isPM)}
            className={`w-full h-12 flex items-center justify-center text-sm text-left hover:bg-primary-accent ${
              isSelected ? "bg-primary-accent text-primary-active" : ""
            }`}
          >
            {i === 0 && field === "hour" && twelveHour
              ? "12"
              : i < 10
              ? `0${i}`
              : i === 24 && field === "hour"
              ? "00"
              : (i == 60 && field !== "hour" && "00") || i.toString()}
          </button>
        );
      }
      return (
        <ScrollArea.Root
          key={field}
          className=" h-[225px] w-14 rounded overflow-hidden bg-white"
        >
          <ScrollArea.Viewport className="h-full rounded">
            {options}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-transparent data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-max"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-text-primary-disabled rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-transparent data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-max"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-text-primary-disabled rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-transparent" />
        </ScrollArea.Root>
      );
    };

    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            className={cn(
              timePickerVariants({
                size,
                twelveHour,
                hourMinuteOnly,
                className,
              }),
              {
                "cursor-not-allowed opacity-50": disabled,
              }
            )}
            disabled={disabled}
            {...props}
          >
            {twelveHour && hourMinuteOnly
              ? `${
                  time.getHours() % 12 === 0 ? 12 : time.getHours() % 12
                }:${time.getMinutes().toString().padStart(2, "0")} ${
                  time.getHours() >= 12 ? "PM" : "AM"
                }`
              : twelveHour
              ? `${
                  time.getHours() % 12 === 0 ? 12 : time.getHours() % 12
                }:${time.getMinutes().toString().padStart(2, "0")}:${time
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"}`
              : hourMinuteOnly
              ? `${time.getHours()}:${time
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`
              : `${time.getHours()}:${time
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}:${time
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`}
          </button>
        </Popover.Trigger>
        <Popover.Content
          side="left"
          align="end"
          className="absolute z-10 shadow-lg rounded-md max-h-45 text-black p-2 "
        >
          <div className="flex">
            <div className="flex-1">
              {timeOptions(
                twelveHour ? 1 : 0,
                twelveHour ? 12 : 23,
                "hour",
                (hour: number) =>
                  handleTimeChange(hour, time.getMinutes(), time.getSeconds())
              )}
            </div>
            <div className="flex-1">
              {timeOptions(0, 59, "minute", (minute: number) =>
                handleTimeChange(time.getHours(), minute)
              )}
            </div>
            {!hourMinuteOnly && (
              <div className="flex-1">
                {timeOptions(0, 59, "second", (second: number | undefined) =>
                  handleTimeChange(time.getHours(), time.getMinutes(), second)
                )}
              </div>
            )}

            {twelveHour ? (
              <div className="flex-1  w-14">
                <button
                  onClick={() =>
                    handleTimeChange(
                      time.getHours() % 12,
                      time.getMinutes(),
                      time.getSeconds(),
                      false
                    )
                  }
                  className={`w-full h-12 text-sm text-center ${
                    time.getHours() < 12
                      ? "bg-primary-accent text-primary-active"
                      : "hover:bg-primary-accent"
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() =>
                    handleTimeChange(
                      time.getHours() % 12,
                      time.getMinutes(),
                      time.getSeconds(),
                      true
                    )
                  }
                  className={`w-full h-12 text-sm text-center ${
                    time.getHours() >= 12
                      ? "bg-primary-accent text-primary-active"
                      : "hover:bg-primary-accent"
                  }`}
                >
                  PM
                </button>
              </div>
            ) : null}
          </div>
        </Popover.Content>
      </Popover.Root>
    );
  }
);

TimePicker.displayName = "TimePicker";

export { TimePicker };
