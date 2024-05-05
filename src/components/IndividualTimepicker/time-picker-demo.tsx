"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { TimePickerInput } from "./time-picker-input";

export interface TimePickerDemoProps {
  time: Date | undefined;
  setTime: (date: Date | undefined) => void;
}

const IndivTimePicker = ({ time, setTime }: TimePickerDemoProps) => {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <label htmlFor="hours" className="text-xs text-text-default">
          Hours
        </label>
        <TimePickerInput
          picker="hours"
          date={time}
          setDate={setTime}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <label htmlFor="minutes" className="text-xs text-text-default">
          Minutes
        </label>
        <TimePickerInput
          picker="minutes"
          date={time}
          setDate={setTime}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <label htmlFor="seconds" className="text-xs text-text-default">
          Seconds
        </label>
        <TimePickerInput
          picker="seconds"
          date={time}
          setDate={setTime}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
};

export { IndivTimePicker };
