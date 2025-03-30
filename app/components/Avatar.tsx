import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  size: number;
  alt: string;
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ size, alt, src }) => {
  var avatarClass = '';

  switch (size) {
    case 32:
      avatarClass = 'rounded-full w-40 h-40 object-cover';
      break;

    case 40:
      avatarClass = 'rounded-full w-40 h-40 object-cover';
      break;

    case 44:
      avatarClass = 'rounded-full w-44 h-44 object-cover';
      break;
    
    case 48:
      avatarClass = 'rounded-full w-48 h-48 object-cover';
      break;
    
    case 52:
      avatarClass = 'rounded-full w-52 h-52 object-cover';
      break;
  }

  return (
    <Image
      unoptimized
      alt={alt}
      src={src != "" && src ? src : "/images/avatar.png"}
      height={250}
      width={250}
      className={avatarClass}
    />
  )
}

export default Avatar