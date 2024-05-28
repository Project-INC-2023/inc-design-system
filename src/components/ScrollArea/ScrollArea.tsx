import React from "react";
import * as Component from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export interface ScrollableAreaProps extends Component.ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
}

const ScrollArea = ({
  children,
  className,
  width = "400px",
  height = "230px",
  ...props
}: ScrollableAreaProps) => {
  return (
    <Component.Root
      className={cn(
        "rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 bg-yellow",
        className
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
      {...props}
    >
      <Component.Viewport className="w-full h-full rounded">
        {children}
      </Component.Viewport>
      <Component.Scrollbar
        className="flex select-none touch-none p-0.5 bg-black transition-colors duration-[160ms] ease-out hover:bg-red-500 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <Component.Thumb className="flex-1 bg-blue-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Component.Scrollbar>
      <Component.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <Component.Thumb className="flex-1 bg-green-900 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Component.Scrollbar>
      <Component.Corner className="bg-blackA5" />
    </Component.Root>
  );
};

export default ScrollArea;
