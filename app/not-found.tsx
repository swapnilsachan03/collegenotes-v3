import React from 'react';
import { TiWarningOutline } from 'react-icons/ti';

export const metadata = {
  title: '404 Not Found - CollegeNotes',
  description: "The page you are looking for could not be found!",
  keywords: 'collegenotes, collegenotes error',

  openGraph: {
    title: '404 Not Found - CollegeNotes',
    description: "The page you are looking for could not be found!",
    url: 'https://www.collegenotes.co.in/404',
  },

  twitter: {
    title: '404 Not Found - CollegeNotes',
    description: "The page you are looking for could not be found!",
  },
}

const NotFound = () => {
  return (
    <div className='w-full h-[94vh] flex flex-col gap-4 items-center justify-center'>
      <div className='flex flex-row gap-2 items-center'>
        <TiWarningOutline size={55} color='#f97316' />
        <h1 className='text-[30px] font-bold text-orange-500'> 404 </h1>
      </div>

      <p className='text-sm w-[290px] leading-[20px] text-center'>
        The page you are looking for does not exist or has been moved. If you think this is unexpected, tell स्वप्निल about this.
      </p>
    </div>
  )
}

export default NotFound;