import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Header from "../header";
import Footer from "../footer";

export type virtualizerProps = {
  horizontal?: boolean;
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  header?: string;
  footer?: string;
};

const ScrollableList = React.forwardRef<HTMLDivElement, virtualizerProps>(
  (
    { children, width = "full", height = "400px", header, footer, ...props },
    forwardedRef
  ) => {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const childrenArray = React.Children.toArray(children);

    const virtualizer = useVirtualizer({
      horizontal: props.horizontal ?? false,
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
          className="p-3 border-1 border-grey-400 first:rounded-t-md last:rounded-b-md"
        >
          <div
            style={{
              height: props.horizontal
                ? "100%"
                : `${virtualizer.getTotalSize()}px`,
              width: props.horizontal
                ? `${virtualizer.getTotalSize()}px`
                : "100%",
              position: "relative",
            }}
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
                    position: props.horizontal ? "absolute" : "relative",
                    height: props.horizontal ? "100%" : "",
                    transform: props.horizontal
                      ? `translateX(${virtualItem.start}px)`
                      : "",
                  }}
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
