"use client";

import React, { useEffect } from "react";
import { TiWarningOutline } from "react-icons/ti";

interface ErrorStateProps {
  error?: Error;
}

const Error: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-[94vh] flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row gap-2 items-center">
        <TiWarningOutline size={55} color="#dc2626" />
        <h1 className="text-[30px] font-bold text-red-600"> Error </h1>
      </div>

      <p className="text-sm w-[300px] leading-[20px] text-center">
        Some error occured. Please try to refresh the page. If the problem
        persists or you think this is unexpected, please contact स्वप्निल.
      </p>
    </div>
  );
};

export default Error;
