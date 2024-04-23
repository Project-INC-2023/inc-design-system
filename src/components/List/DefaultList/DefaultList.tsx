import React, { forwardRef } from "react";
import Header from "../header";
import Footer from "../footer";

type Props = {
  header?: string;
  footer?: string;
  children: React.ReactNode;
};

const DefaultList = forwardRef<HTMLDivElement, Props>(
  ({ header, footer, children }, forwardRef) => {
    const childrenArray = React.Children.toArray(children);

    return (
      <div className="bg-white rounded-lg border border-1 border-grey-300 divide-y divide-grey-300">
        {header && <Header header={header} />}

        <div className="divide-y divide-grey-300">
          {childrenArray.map((child, index) => (
            <div className="p-4" key={index}>{child}</div>
          ))}

          {footer && <Footer footer={footer} />}
        </div>
      </div>
    );
  }
);

export default DefaultList;
