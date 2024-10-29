import React from "react";

interface IndentedComponentProps {
  children: React.ReactNode;
  className?: string;
}

const IndentedComponent: React.FC<IndentedComponentProps> = ({
  children,
  className,
}) => {
  return <div className={`ml-4 ${className || ""}`}>{children}</div>;
};

export default IndentedComponent;
