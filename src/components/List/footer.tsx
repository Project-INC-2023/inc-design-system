import React from "react";

type Props = {
  footer: string;
};

const Footer = ({ footer }: Props) => {
  return (
    <div className="p-4">
      <div>{footer}</div>
    </div>
  );
};

export default Footer;
