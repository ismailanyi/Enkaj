"use client";

import React, { ReactNode } from "react";

type Props = {
  text?: string;
  additonalRender: ReactNode;
};
const SubHeader: React.FC<Props> = ({
  text = "Enkaj | Home",
  additonalRender,
}) => {
  return (
    <div className="bg-tealGradient">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
        <div className="text-2xl font-semibold text-white">{text}</div>

        {additonalRender}
      </div>
    </div>
  );
};

export default SubHeader;
