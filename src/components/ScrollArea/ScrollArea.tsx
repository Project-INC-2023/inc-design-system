"use client";
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
  width,
  ...props
}: ScrollableAreaProps) => {


  return (
    <Component.Root className="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-blackA4 bg-yellow-300">
      <Component.Viewport asChild className="w-full h-full rounded">
        <div>{children && children}</div>
      </Component.Viewport>

      <Component.Scrollbar
        className="inc-design-system-select-scroll-area-scrollbar"
        orientation="vertical"
      >
        <Component.Thumb
          // className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
          className="inc-design-system-select-scroll-area-thumb"
        />
      </Component.Scrollbar>

      
      <Component.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="horizontal"
      >
        <Component.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </Component.Scrollbar>

      <Component.Corner className="bg-blackA5" />


    </Component.Root>
  );
};

export default ScrollArea;
