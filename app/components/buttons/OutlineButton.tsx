import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  color: string;
  label?: string;
  children?: React.ReactNode;
  loading?: boolean;
  submit?: boolean;
  rightIcon?: IconType;
  leftIcon?: IconType;
  onClick?: () => void;
}

const OutlineButton: React.FC<ButtonProps> = ({
  color,
  label,
  children,
  loading,
  submit,
  rightIcon: RightIcon,
  leftIcon: LeftIcon,
  onClick,
}) => {
  var btnClass = "";

  switch (color) {
    case "teal":
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-teal-600
        dark:text-teal-400
        font-semibold
        border-[1px]
        border-teal-600
        dark:border-teal-400
        bg-transparent
        hover:bg-teal-400/10
        rounded-md
        transition ease-linear duration-200
      `;

    case "red":
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-red-600
        dark:text-red-400
        font-semibold
        border-[1px]
        border-red-600
        dark:border-red-400
        bg-transparent
        hover:bg-red-400/10
        rounded-md
        transition ease-linear duration-200
      `;
      break;

    case "cyan":
      btnClass = `
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-cyan-600
        dark:text-cyan-400
        font-semibold
        border-[1px]
        border-cyan-600
        dark:border-cyan-400
        bg-transparent
        hover:bg-cyan-400/10
        rounded-md
        transition ease-linear duration-200
      `;
      break;
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      className={`
        flex
        items-center
        justify-center
        gap-2
        h-8
        px-3
        text-sm
        text-${color}-600
        dark:text-${color}-400
        font-semibold
        border-[1px]
        border-${color}-600
        dark:border-${color}-400
        bg-transparent
        hover:bg-${color}-400/10
        rounded-md
        transition ease-linear duration-200
      `}
      onClick={onClick}
    >
      {LeftIcon && <LeftIcon />}
      {label && <text> {label} </text>}
      {!label && children}
      {RightIcon && <RightIcon />}
    </button>
  );
};

export default OutlineButton;
