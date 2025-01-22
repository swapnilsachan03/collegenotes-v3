"use client";

import React from "react";

interface InputProps {
  placeholder: string;
  color: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const OutlinedInput: React.FC<InputProps> = ({
  placeholder,
  color,
  value,
  onChange,
  type,
  disabled,
  required,
}) => {
  var inputClass = "";

  switch (color) {
    default:
      inputClass = `
        relative
        w-full
        py-[5.5px] px-3
        text-[13px]
        bg-transparent
        rounded-md
        border-[1px]
        border-gray-200
        dark:border-gray-600
        hover:border-gray-300
        hover:dark:border-gray-500
        focus:border-cyan-500
        dark:focus:border-cyan-500
        focus:shadow-[0_0_0_1px_rgba(0,181,216)]
        transition ease-linear duration-200
        focus:outline-none
      `;
      break;
  }

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      className={inputClass}
    />
  );
};

export default OutlinedInput;
