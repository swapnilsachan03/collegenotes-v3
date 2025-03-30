'use client'

import React from 'react';

interface InputProps {
  placeholder: string;
  color: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  color,
  value,
  onChange,
  type,
  disabled,
  required
}) => {
  var inputClass = '';

  switch (color) {
    default:
      inputClass = `
        relative
        w-full
        py-[5px]
        text-[13px]
        bg-transparent
        border-b-[1px]
        border-b-gray-300
        dark:border-b-gray-500
        focus:border-teal-500
        dark:focus:border-teal-500
        transition ease-linear duration-200
        focus:outline-none
      `
      break;
  }

  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className={inputClass}
    />
  )
}

export default Input