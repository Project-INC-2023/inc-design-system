"use client"

import React from "react";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";

export const IconMap = {
  success: { icon: CircleCheck, size: 24 }, 
  error: { icon: CircleX, size: 24 }, 
  info: { icon: Info, size: 24 }, 
  warning: { icon: TriangleAlert, size: 24 }, 
};

type ResultStatusType = keyof typeof IconMap;

interface ResultProps {
  status?: ResultStatusType;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  icon?: React.ReactNode; 
  size?: number; 
  titleFontSize?: string;  
  subTitleFontSize?: string;
}

const ResultPage: React.FC<ResultProps> = ({
  status,
  title,
  subTitle,
  extra,
  icon: CustomIcon, 
  size,
  titleFontSize = '20px',
  subTitleFontSize = '12px',
}) => {
  // Determine which icon to use based on the props
  let IconComponent: React.ElementType | undefined;
  let iconSize: number | undefined;

  if (CustomIcon) {
    // Use custom icon if provided
    IconComponent = () => <>{CustomIcon}</>; 
    iconSize = size;
  } else if (status && IconMap[status]) {
    // Use icon from IconMap if status is provided and valid
    IconComponent = IconMap[status].icon;
    iconSize = size || IconMap[status].size; // Use custom size if provided, otherwise use size from IconMap
  }

  return (
    <div className="result-container">
      <div
        className="result-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="result-icon" style={{ marginBottom: '8px' }}>
          {IconComponent && (
            <IconComponent size={iconSize} /> // Pass iconSize as a prop to adjust the size of the icon
          )}
        </div>
        <div className="result-details">
          {title && <div className="result-title" style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: titleFontSize}}>{title }</div>}
          {subTitle && <div className="result-subtitle" style={{ marginBottom: '8px', fontSize: subTitleFontSize, opacity: 0.5}}>{subTitle}</div>}
          {extra && <div className="result-extra">{extra}</div>}
        </div>
      </div>
    </div>
  );
};

export { ResultPage, ResultProps, ResultStatusType };
