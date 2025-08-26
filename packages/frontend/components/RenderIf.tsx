import React, { ReactNode } from "react";

interface RenderIfProps {
  children: ReactNode;
  isTrue: boolean;
}

const RenderIf: React.FC<RenderIfProps> = ({ children, isTrue }) => {
  return isTrue ? <>{children}</> : null;
};

export default RenderIf;
