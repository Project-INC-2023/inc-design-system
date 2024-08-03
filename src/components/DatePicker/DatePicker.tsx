"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../Button/Button";
import { Calendar, CalendarDateRange } from "../Calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "../Popover/Popover";
import { type Matcher } from "react-day-picker";

interface BaseDatePickerProps extends PopoverProps {
  /**
   * The current date.
   * @default new Date()
   */
  today?: Date;
  /**
   * A boolean that determines whether the date picker is disabled. If `true`, the date picker is disabled and cannot be interacted with. If `false` or omitted, the date picker is enabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * A string that is added to the class list of the button element in the date picker. This can be used to add custom styles to the button.
   * @default ""
   */
  buttonClassName?: string;
  /**
   * A string that is added to the class list of the dropdown element in the date picker. This can be used to add custom styles to the dropdown.
   */
  dropDownClassName?: string;
  /**
   * A string that is added to the class list of the calendar element in the date picker. This can be used to add custom styles to the calendar.
   */
  calendarClassName?: string;
  /**
   * The `disabledDates` prop allows you to specify which days should be disabled in the calendar.
   * You can disable days in various ways:
   *
   * - Disable specific dates:
   *   @example disabledDates={[new Date(2022, 0, 1), new Date(2022, 0, 2)]} // Disable January 1st and 2nd, 2022
   *   @example disabledDates={new Date(2022, 0, 1)} // Disable January 1st, 2022
   *   @example disabledDates={[]} // Disable no dates
   *   @example disabledDates={undefined} // Disable no dates
   *
   * - Disable dates before and/or after specific dates:
   *   @example
   *   disabledDates={{
   *     before: new Date("2024-4-1"),
   *     after: new Date("2024-4-15"),
   *   }} // Disable dates before April 1st, 2024 and after April 15th, 2024
   *  @example
   *  disabledDates={{
   *     before: new Date()
   *   }} // Disable dates before today
   *  @example
   *  disabledDates={{
   *     after: new Date()
   *   }} // Disable dates after today
   *
   * - Disable specific days of the week (e.g., Sundays and Saturdays):
   *   @example
   *   disabledDates={{
   *     daysOfWeek: [0, 6],
   *   }} // Disable Sundays and Saturdays
   *
   * - Combine disabling specific days of the week and specific dates:
   *   @example
   *   disabledDates={{
   *     daysOfWeek: [0, 6],
   *     dates: [new Date("2024-4-30"), new Date("2024-4-23")],
   *   }} // Disable Sundays, Saturdays, April 30th, 2024, and April 23rd, 2024
   *
   * - Disable a range of dates:
   *   @example
   *   disabledDates={{
   *     from: new Date("2024-4-1"),
   *     to: new Date("2024-4-15"),
   *   }} // Disable dates from April 1st, 2024 to April 15th, 2024
   */
  disabledDates?: Matcher | Matcher[] | undefined;
}

interface DatePickerProps extends BaseDatePickerProps {
  /**
   * The currently selected date. If a date is selected, it will be displayed in the date picker. If no date is selected, the placeholder text will be displayed instead.
   */
  selected?: Date;
  /**
   * A callback function that is called when a date is selected in the date picker. The selected date is passed as an argument to this function.
   */
  onSelect?: (date: Date) => void;
  /**
   * The placeholder text that is displayed in the date picker when no date is selected.
   * @default "Pick a date"
   */
  placeholder?: string;
}

interface RangeDatePickerProps extends BaseDatePickerProps {
  /**
   * The currently selected date. If a date is selected, it will be displayed in the date picker. If no date is selected, the placeholder text will be displayed instead.
   */
  selected?: CalendarDateRange;
  /**
   * A callback function that is called when a date is selected in the date picker. The selected date is passed as an argument to this function.
   */
  onSelect?: (date: CalendarDateRange) => void;
  /**
   * The placeholder text that is displayed when the start date is not selected.
   * @default "Start date"
   */
  startDatePlaceholder?: string;
  /**
   * The placeholder text that is displayed when the end date is not selected.
   * @default "End date"
   */
  endDatePlaceholder?: string;
}

const DatePicker = ({
  today = new Date(),
  selected,
  onSelect,
  placeholder = "Pick a date",
  disabled = false,
  buttonClassName,
  dropDownClassName,
  calendarClassName,
  disabledDates,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  const handleOnSelect = (date: Date | undefined) => {
    if (!date) return;
    setDate(date);
    onSelect?.(date);
  };

  React.useEffect(() => {
    setDate(selected);
  }, [selected]);

  return (
    <Popover {...props}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant={"secondary"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-grey-400",
            "border-primary hover:text-primary",
            buttonClassName
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0 z-50", dropDownClassName)}>
        <Calendar
          className={calendarClassName}
          today={today}
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          disabled={disabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const RangeDatePicker = ({
  today = new Date(),
  selected,
  onSelect,
  disabled = false,
  buttonClassName,
  dropDownClassName,
  calendarClassName,
  startDatePlaceholder = "Start date",
  endDatePlaceholder = "End date",
  disabledDates,
  ...props
}: RangeDatePickerProps) => {
  const [date, setDate] = React.useState<CalendarDateRange | undefined>(
    selected
  );

  const handleOnSelect = (date: CalendarDateRange | undefined) => {
    if (!date) return;
    setDate(date);
    onSelect?.(date);
  };

  React.useEffect(() => {
    setDate(selected);
  }, [selected]);

  return (
    <Popover {...props}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant={"secondary"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-grey-400",
            "border-primary hover:text-primary",
            buttonClassName
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <span>
              {date.from ? format(date.from, "PPP") : startDatePlaceholder} -{" "}
              {date.to ? format(date.to, "PPP") : endDatePlaceholder}
            </span>
          ) : (
            <span>
              {startDatePlaceholder} - {endDatePlaceholder}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-0 z-50", dropDownClassName)}>
        <Calendar
          className={calendarClassName}
          today={today}
          mode="range"
          selected={date}
          onSelect={handleOnSelect}
          disabled={disabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker, RangeDatePicker, DatePickerProps, RangeDatePickerProps };
