'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import SolidButton from './buttons/SolidButton';

export type Review = {
  content: string,
  profileImg: string,
  name: string,
  institution: string,
  degreeAndYear: string
}

interface ReviewCardProps {
  reviews: Review[];
}

const ReviewCard = (review: Review) => {
  return (
    <div
      className='
        flex flex-col gap-10
        max-w-full
        md:max-w-[450px]
        lg:max-w-[550px]
        p-6
        rounded-xl
        bg-gray-50 dark:bg-neutral-900
        border-[1px]
        border-gray-200 dark:border-neutral-700
        shadow-md
      '
    >
      <p className='text-lg'>{review.content}</p>

      <div className='flex flex-row gap-4'>
        <Image
          alt="Profile image"
          src={review.profileImg}
          loading="lazy"
          width={85}
          height={85}
          className="rounded-lg"
        />

        <div className='flex flex-col gap-1 items-start justify-start'>
          <p className='text-xl font-semibold'> {review.name} </p>

          <div className='flex flex-col items-start'>
            <p className='text-sm'> {review.institution} </p>
            <p className='text-sm text-gray-600'> {review.degreeAndYear} </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ReviewCarousel: React.FC<ReviewCardProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? reviews.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === reviews.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='
      flex flex-col md:flex-row
      gap-12 md:gap-8
      items-start
      justify-between
      w-full
      px-4
      md:px-8
      lg:px-16
      xl:px-32
      2xl:px-80
      py-8
      md:py-16
    '>
      <div className='flex flex-col justify-start gap-8 mt-4'>
        <h1 className='font-extrabold text-3xl underline'>
          Testimonials
        </h1>

        <p className="w-3/4">
          See what thousands of college and university students studying with CollegeNotes have to say about us.
        </p>

        <div className="flex flex-row gap-2">
          <SolidButton
            color='teal'
            leftIcon={HiArrowLeft}
            onClick={goToPrevious}
          />

          <SolidButton
            color='teal'
            rightIcon={HiArrowRight}
            onClick={goToNext}
          />
        </div>
      </div>

      <ReviewCard {...reviews[currentIndex]} />
    </div>
  )
}

export default ReviewCarousel;