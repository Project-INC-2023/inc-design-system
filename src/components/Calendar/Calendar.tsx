"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../Button/Button";
import { addMonths, isSameMonth } from "date-fns";

/**
 * Props used so far for the Calendar component
 * @typedef CalendarProps
 * @type {object}
 * @property {string} [className] - The class name of the calendar.
 * @property {object} [classNames] - The class names for the calendar.
 * @property {boolean} [showOutsideDays] - Whether to show outside days or not.
 * @property {Date} [today] - The current date.
 * @property {React.ReactNode} [footer] - The footer of the calendar.
 * @property {Date | Date[] | CalendarDateRange | undefined} [selected] - The selected date. Type `Date` for "single" mode, `Date[]` for "multiple" mode, and `CalendarDateRange` for "range" mode.
 * @property {(selected: Date | Date[] | CalendarDateRange | undefined) => void} [onSelect] - Callback function that is called when a date or a range of dates is selected.
 * The type of the parameter depends on the mode:
 * - For 'single' mode, the parameter is `Date | undefined`
 * - For 'multiple' mode, the parameter is `Date[] | undefined`
 * - For 'range' mode, the parameter is `CalendarDateRange | undefined`
 *
 * @property {(date: Date) => void} [onDayClick] - The function to call when a day is clicked. This function is always called with the clicked date, even if the date is unselected.
 * @property {Date[]} [disabled] - The dates that should be disabled.
 * @property {Date[]} [hidden] - The dates that should be hidden.
 * @property {"single" | "multiple" | "range"} [mode] - The selection mode. Default is "single". If "multiple", the calendar allows multiple dates to be selected. If "range", the calendar allows a range of dates to be selected.
 * @property {object} [props] - The other props for the calendar.
 */
type CalendarProps = React.ComponentProps<typeof DayPicker>;
type CalendarDateRange = DateRange;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  today = new Date(),
  disabled = [],
  hidden = [],
  onDayClick,
  ...props
}: CalendarProps) => {
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = React.useState<Date>(nextMonth);

  const footer = (
    <div className="border-t border-grey-300 flex justify-center items-center">
      <Button
        disabled={isSameMonth(today, month)}
        onClick={() => setMonth(today)}
        variant="text"
        className="text-primary hover:text-primary-accent focus:text-primary-accent hover:bg-transparent"
      >
        Today
      </Button>
    </div>
  );

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={month}
      onMonthChange={setMonth}
      footer={footer}
      disabled={disabled}
      hidden={hidden}
      onDayClick={onDayClick}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-text-default",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "text" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-text-default rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:rounded-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "text" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-text-light hover:bg-primary-accent hover:text-grey-100 focus:bg-primary focus:text-light rounded-md",
        day_today: "bg-primary-accent text-text-default",
        day_outside:
          "day-outside text-grey-400 opacity-50 aria-selected:bg-primary/50 aria-selected:text-background aria-selected:opacity-30",
        day_disabled: "text-grey-400 opacity-50",
        day_range_middle:
          "aria-selected:bg-primary aria-selected:text-text-light",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};
Calendar.displayName = "Calendar";

export { Calendar, CalendarProps, CalendarDateRange };
