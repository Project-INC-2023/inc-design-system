"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../Button/Button";
import { Calendar } from "../Calendar/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";

type DatePickerProps = {
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
};
const DatePicker = ({
  selected,
  onSelect,
  placeholder = "Pick a date",
  disabled = false,
  buttonClassName,
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  const handleOnSelect = (date: Date | undefined) => {
    if (!date) return;
    setDate(date);
    onSelect?.(date);
  };

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant={"secondary"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-grey-400",
            buttonClassName
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
