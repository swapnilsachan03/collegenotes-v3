import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
  color: string;
  label?: string;
  children?: React.ReactNode;
  loading?: boolean;
  submit?: boolean;
  rightIcon?: IconType;
  leftIcon?: IconType;
  onClick?: (e: any | undefined) => void;
}

const SolidButton: React.FC<ButtonProps> = ({
  color,
  label,
  children,
  loading,
  submit,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  onClick
}) => {
  var btnClass = '';

  switch (color) {
    case 'teal':
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-white
        dark:text-black
        font-medium
        bg-teal-600
        hover:bg-teal-700
        dark:bg-teal-400
        dark:hover:bg-teal-500
        rounded-md
        transition ease-linear duration-200
      `
      break;
    
    case 'cyan':
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-white
        dark:text-black
        font-medium
        bg-cyan-600
        hover:bg-cyan-700
        dark:bg-cyan-400
        dark:hover:bg-cyan-500
        rounded-md
        transition ease-linear duration-200
      `
      break;
    
    case 'red':
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-white
        dark:text-black
        font-medium
        bg-red-600
        hover:bg-red-700
        dark:bg-red-400
        dark:hover:bg-red-500
        rounded-md
        transition ease-linear duration-200
      `
      break;
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      className={btnClass}
      onClick={onClick}
    >
      { LeftIcon && <LeftIcon /> }
      { label && <text> {label} </text>}
      { !label && children }
      { RightIcon && <RightIcon /> }
    </button>
  )
}

export default SolidButton;