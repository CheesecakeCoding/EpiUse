import { ReactNode } from "react";
import { useState } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Alert = ({ children, onClose }: Props) => {
  return (
    <div className="alert alert-primary alert-dismissible">{children}</div>
  );
};

export default Alert;
