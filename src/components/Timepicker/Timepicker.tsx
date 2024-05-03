import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Time {
  hour: string;
  minute: string;
  second: string;
  period: string;
}

const TimePicker = () => {
  const [time, setTime] = useState<Time>({
    hour: "12",
    minute: "00",
    second: "00",
    period: "AM",
  });

  const updateField = (field: keyof Time, value: string) => {
    setTime((prev) => ({ ...prev, [field]: value }));
  };

  const timeOptions = (
    start: number,
    end: number,
    field: keyof Time
  ): JSX.Element => {
    const selectedValue = time[field];
    let options: string[] = [];
    for (let i = start; i <= end; i++) {
      let value = i < 10 ? `0${i}` : `${i}`;
      options.push(value);
    }
    return (
      <ScrollArea.Root
        key={field}
        className=" h-[225px] w-14 rounded overflow-hidden  bg-white"
      >
        <ScrollArea.Viewport className="h-full rounded">
          {options.map((value, index) => (
            <button
              key={index}
              onClick={() => updateField(field, value)}
              className={`w-full h-12 flex items-center p-0 justify-center text-sm text-left hover:bg-primary-accent ${
                selectedValue === value
                  ? "bg-primary-accent text-primary-active"
                  : ""
              }`}
            >
              {value}
            </button>
          ))}
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
        <button className="px-4 py-2 border rounded-md shadow-sm text-black">
          {`${time.hour}:${time.minute}:${time.second} ${time.period}`}
        </button>
      </Popover.Trigger>
      <Popover.Content
        side="left"
        align="end"
        className="absolute z-10 shadow-lg rounded-md max-h-45 text-black"
      >
        <div className="flex">
          <div className="flex-1">
            <div className="flex flex-col">{timeOptions(1, 12, "hour")}</div>
          </div>
          <div className="flex-1 ">
            <div className="flex flex-col">{timeOptions(0, 59, "minute")}</div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">{timeOptions(0, 59, "second")}</div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <button
                onClick={() => updateField("period", "AM")}
                className="w-full px-4 py-2 text-sm text-left hover:bg-primary-accent"
              >
                AM
              </button>
              <button
                onClick={() => updateField("period", "PM")}
                className="w-full px-4 py-2 text-sm text-left hover:bg-primary-accent"
              >
                PM
              </button>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export { TimePicker };
