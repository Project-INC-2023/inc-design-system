import React from "react";

type Props = {
  header: string;
};

const Header = ({ header }: Props) => {
  return (
    <div className="p-4">
      <div>{header}</div>
    </div>
  );
};

export default Header;
