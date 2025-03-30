'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const Loading = () => {
  const pathname = usePathname();
  const isAdmin = pathname!.includes('/admin');

  return (
    <>
      <style>
        {`
          .spinner {
            width: 70.4px;
            height: 70.4px;
            --clr: ${isAdmin ? "#06b6d4" : "#14b8a6"};
            --clr-alpha: ${isAdmin ? "rgb(165, 243, 252, 0.1)" : "rgb(153, 246, 228, 0.1)"};
            animation: spinner 2s infinite ease;
            transform-style: preserve-3d;
          }
          
          .spinner > div {
            background-color: var(--clr-alpha);
            height: 100%;
            position: absolute;
            width: 100%;
            border: 3.5px solid var(--clr);
          }
          
          .spinner div:nth-of-type(1) {
            transform: translateZ(-35.2px) rotateY(180deg);
          }
          
          .spinner div:nth-of-type(2) {
            transform: rotateY(-270deg) translateX(50%);
            transform-origin: top right;
          }
          
          .spinner div:nth-of-type(3) {
            transform: rotateY(270deg) translateX(-50%);
            transform-origin: center left;
          }
          
          .spinner div:nth-of-type(4) {
            transform: rotateX(90deg) translateY(-50%);
            transform-origin: top center;
          }
          
          .spinner div:nth-of-type(5) {
            transform: rotateX(-90deg) translateY(50%);
            transform-origin: bottom center;
          }
          
          .spinner div:nth-of-type(6) {
            transform: translateZ(35.2px);
          }
          
          @keyframes spinner {
            0% {
              transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            }
          
            50% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            }
          
            100% {
              transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            }
          }
        `}
      </style>

      <div className='
        bg-inherit
        w-full h-[94vh]
        flex flex-col gap-1.5
        items-center justify-center
        text-[14px]
      '>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    
    </>
  )
}

export default Loading