import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Header from "../header";
import Footer from "../footer";
import { cn } from "../../../lib/utils";

type RowVirtualiserProps = {
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  header?: string;
  footer?: string;
  className?: string;
  itemClassName?: string;
};

const RowScrollableList = React.forwardRef<HTMLDivElement, RowVirtualiserProps>(
  (
    {
      children,
      width = 400,
      height = 400,
      header,
      footer,
      className,
      itemClassName,
      ...props
    },
    forwardRef
  ) => {
    const parentRef = React.useRef<HTMLDivElement>(null);

    const childrenArray = React.Children.toArray(children);
    const count = childrenArray.length;

    const virtualizer = useVirtualizer({
      count,
      getScrollElement: () => parentRef.current,
      // estimated height since this is row, 150px for now
      estimateSize: () => 150,
    });

    const items = virtualizer.getVirtualItems();

    return (
      <div className={cn(className)}>
        {header && <Header header={header} />}

        <div
          ref={parentRef}
          style={{
            height: height,
            width: width,
            overflow: "auto",
            contain: "strict",
          }}
        >
          <div
            style={{
              // since this is row, we need to calculate the height
              height: virtualizer.getTotalSize(),
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${items[0]?.start ?? 0}px)`,
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
                    //gets estimated height, hence in estimateSize I returned 50px, so scrolling would be smooth
                    ref={virtualizer.measureElement}
                  >
                    <div className={cn(itemClassName)}>{child}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {footer && <Footer footer={footer} />}
      </div>
    );
  }
);

export default RowScrollableList;
