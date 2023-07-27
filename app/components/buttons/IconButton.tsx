import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
  color: string;
  icon: IconType;
  loading?: boolean;
  onClick?: () => void;
}

const IconButton: React.FC<ButtonProps> = ({
  color,
  icon: Icon,
  loading,
  onClick
}) => {
  return (
    <button
      className={`
        flex
        items-center
        justify-center
        w-9 h-8
        rounded-md
        text-${color}-600
        dark:text-${color}-400
        bg-neutral-500/20
        hover:bg-neutral-500/30
        transition ease-linear duration-200
      `}
      onClick={onClick}
    >
      <Icon size={15} />
    </button>
  )
}

export default IconButton