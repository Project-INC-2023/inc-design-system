import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Header from "../header";
import Footer from "../footer";
import {cn} from "../../../lib/utils";

export type virtualizerProps = {
  horizontal?: boolean;
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  header?: string;
  footer?: string;
  className?: string;
};

const ScrollableList = React.forwardRef<HTMLDivElement, virtualizerProps>(
  (
    { children, className, width = "full", height = "400px", header, footer, horizontal = false, ...props },
    forwardedRef
  ) => {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const childrenArray = React.Children.toArray(children);

    const virtualizer = useVirtualizer({
      horizontal: horizontal,
      count: childrenArray.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 50,
    });

    const items = virtualizer.getVirtualItems();

    return (
      <>
        {header && <Header header={header} />}
        <div
          ref={parentRef}
          style={{
            height: height,
            width: width,
            overflow: "auto",
          }}
          className={cn(
            "bg-grey-100 data-[state=open]:text-primary flex flex-row justify-between w-full group",
            className
          )}
        >
          <div
            // style={{
            //   height: props.horizontal
            //     ? "100%"
            //     : `${virtualizer.getTotalSize()}px`,
            //   width: props.horizontal
            //     ? `${virtualizer.getTotalSize()}px`
            //     : "100%",
            //   position: "relative",
            // }}

            className={cn("relative", horizontal ? `w-[${virtualizer.getTotalSize()}px] h-full` : `h-[${virtualizer.getTotalSize()}px] w-full`)}
          >
            {items.map((virtualItem) => {
              const child = childrenArray[virtualItem.index];
              const { children } = React.isValidElement(child)
                ? child.props
                : { children: null };

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: horizontal ? "absolute" : "relative",
                    height: horizontal ? "100%" : "",
                    transform: horizontal
                      ? `translateX(${virtualItem.start}px)`
                      : "",
                  }}
                  // className={cn(horizontal ? `absolute h-full translate-x-[${virtualItem.start}px]`: "relative")}
                >
                  <div className="">{children}</div>
                </div>
              );
            })}
          </div>
        </div>
        {footer && <Footer footer={footer} />}
      </>
    );
  }
);

export default ScrollableList;
