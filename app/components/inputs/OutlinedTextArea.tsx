import React from 'react'

interface InputProps {
  placeholder: string;
  color: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const OutlinedTextArea: React.FC<InputProps> = ({
  placeholder,
  color,
  value,
  onChange,
  disabled,
  required
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      className={`
        relative
        w-full
        py-[5.5px] px-3
        text-[13px]
        bg-transparent
        rounded-md
        resize-none h-[60px]
        border-[1px]
        border-gray-200
        dark:border-gray-600
        hover:border-gray-300
        hover:dark:border-gray-500
        focus:border-${color}-500
        dark:focus:border-${color}-500
        focus:shadow-[0_0_0_1px_rgba(0,181,216)]
        transition ease-linear duration-200
        focus:outline-none
      `}
    />
  )
}

export default OutlinedTextArea;