import React, { CSSProperties, forwardRef } from "react";
import Header from "../header";
import Footer from "../footer";
import { cn } from "@/lib/utils";

type Props = {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
  itemsPerRow?: number;
};

const DefaultList = forwardRef<HTMLDivElement, Props>(
  (
    { header, footer, className, itemsPerRow = 0, children, ...props },
    forwardRef
  ) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-1 border-grey-300 divide-y divide-grey-300 ",
          className
          // `w-[${width}]`,
          // `h-[${height}]`
        )}
      >
        {header && <Header header={header} />}

        <div
          className={cn(
            "divide-y divide-grey-300",
            itemsPerRow > 1 && itemsPerRow <= 12  ? `grid grid-cols-${itemsPerRow} md:grid-cols-${itemsPerRow - 1 } ` : "flex flex-col"
          )}
        >
          {childrenArray.map((child, index) => (
            <div className="p-4" key={index}>
              {child}
            </div>
          ))}
        </div>
        {footer && <Footer footer={footer} />}
      </div>
    );
  }
);

export default DefaultList;
