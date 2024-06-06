import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Header from "../header";
import Footer from "../footer";
import { cn } from "../../../lib/utils";

type ColumnVirtualizerProps = {
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  header?: string;
  footer?: string;
  className?: string;
  itemClassName?: string;
};

const ColumnScrollableList = React.forwardRef<
  HTMLDivElement,
  ColumnVirtualizerProps
>(
  (
    {
      children,
      width = 400,
      height = 200,
      header,
      footer,
      className,
      itemClassName,
      ...props
    },
    forwardRef
  ) => {
    const childrenArray = React.Children.toArray(children);
    const count = childrenArray.length;

    const parentRef = React.useRef<HTMLDivElement | null>(null);

    const virtualizer = useVirtualizer({
      horizontal: true,
      count: count,
      getScrollElement: () => parentRef.current,
      // estimated width since this is row, 200px for now
      estimateSize: () => 200,
    });

    const items = virtualizer.getVirtualItems();

    return (
      <div>
        {header && <Header header={header} />}
        <div
          ref={parentRef}
          className="List"
          style={{ width: width, height: height, overflowY: "auto" }}
        >
          <div
            style={{
              // since this is column, we need to calculate the width
              width: virtualizer.getTotalSize(),
              height: "100%",
              position: "relative",
            }}
          >
            {items.map((virtualItem) => {
              // create an array based on the children
              const child = childrenArray[virtualItem.index];

              // children validation
              const { children } = React.isValidElement(child)
                ? child.props
                : { children: null };

              return (
                <div
                  key={virtualItem.key}
                  data-index={virtualItem.index}
                  //gets estimated width, hence in estimateSize I returned 50px, so scrolling would be smooth
                  ref={virtualizer.measureElement}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    transform: `translateX(${virtualItem.start}px)`,
                  }}
                >
                  <div className={cn(itemClassName)}>{child}</div>
                </div>
              );
            })}
          </div>
        </div>
        {footer && <Footer footer={footer} />}
      </div>
    );
  }
);

export default ColumnScrollableList;
