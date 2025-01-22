"use client";

import React from "react";

interface InputProps {
  placeholder: string;
  color: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  color,
  value,
  onChange,
  disabled,
  required,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        onChange(e.target.value)
      }
      className={`
        relative
        w-full
        py-[5px]
        text-[13px]
        bg-transparent
        resize-none h-[60px]
        border-b-[1px]
        border-b-gray-300
        dark:border-b-gray-500
        focus:border-${color}-500
        dark:focus:border-${color}-500
        transition ease-linear duration-200
        focus:outline-none
      `}
    />
  );
};

export default Input;
