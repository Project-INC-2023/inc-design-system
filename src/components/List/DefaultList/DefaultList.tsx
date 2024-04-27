import React, { forwardRef } from "react";
import Header from "../header";
import Footer from "../footer";
import { cn } from "@/lib/utils";

type Props = {
  header?: string;
  footer?: string;
  children: React.ReactNode;
  className?: string;
};

const DefaultList = forwardRef<HTMLDivElement, Props>(
  ({ header, footer, className, children, ...props }, forwardRef) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-1 border-grey-300 divide-y divide-grey-300",
          className
        )}
      >
        {header && <Header header={header} />}

        <div className="divide-y divide-grey-300">
          {childrenArray.map((child, index) => (
            <div className="p-4" key={index}>
              {child}
            </div>
          ))}

          {footer && <Footer footer={footer} />}
        </div>
      </div>
    );
  }
);

export default DefaultList;
