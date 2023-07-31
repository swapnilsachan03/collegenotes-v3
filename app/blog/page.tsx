import Image from 'next/image';
import React from 'react'

import { Blog } from '@prisma/client';

import BlogCard from './BlogCard';
import getBlogs from '../actions/getBlogs';

export const metadata = {
  title: 'CollegeBlog - The blog from CollegeNotes',
  description: 'Read the latest & most helpful blogs from the people at CollegeNotes. We write about college life, study tips, course guides, career advice & more. Gain exclusive insights on various topics helpful for your college journey.',
  keywords: 'collegenotes, collegenotes blog, collegeblog, college advice, assignment solutions',
  robots: 'index, follow',

  openGraph: {
    title: 'CollegeBlog - The blog from CollegeNotes',
    description: "Read the latest & most helpful blogs from the people at CollegeNotes. We write about college life, study tips, course guides, career advice & more. Gain exclusive insights on various topics helpful for your college journey.",
    url: 'https://www.collegenotes.co.in/blog',
    images: [
      {
        url: 'https://www.collegenotes.co.in/images/blog-meta-image.jpg',
        alt: 'CollegeBlog'
      },
    ],
  },

  twitter: {
    title: 'CollegeBlog - The blog from CollegeNotes',
    description: "Read the latest & most helpful blogs from the people at CollegeNotes. We write about college life, study tips, course guides, career advice & more. Gain exclusive insights on various topics helpful for your college journey."
  },
}

const CollegeBlog = async () => {
  const blogs = await getBlogs();

  const createdAt = new Date(blogs[0].createdAt).toUTCString().slice(0, -12);

  return (
    <div className='flex justify-center w-full'>
      <div
        className='
          flex flex-col gap-7
          w-full
          min-h-[95vh]
          px-4
          md:px-8
          lg:px-16
          xl:px-4
          xl:w-[1275px]
          py-10 md:py-14
        '
      >
        <div className='w-full flex flex-col md:flex-row gap-7 items-center'>
          <div className='w-full md:w-[50%] h-80 sm:h-96 2xl:h-[410px]'>
            <Image
              unoptimized
              src={blogs[0].cover ? blogs[0].cover.url : blogs[0].poster.url}
              alt={blogs[0].title}
              width={500}
              height={500}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex flex-col gap-4 w-full md:w-[50%]'>
            <h3 className='text-sm md:text-base font-bold font-roboto_condensed uppercase max-w-max border-b-[3px] border-black dark:border-white'>
              { blogs[0].headline }
            </h3>

            <a
              href={`/blog/${blogs[0].blogId}`}
              className='text-3xl md:text-4xl lg:text-[54px] lg:leading-[58px] font-extrabold font-source hover:underline hover:underline-offset-[6px]'
            >
              { blogs[0].title }
            </a>

            <p className='text-[15px] font-light mt-2'>
              { blogs[0].summary }
            </p>

            <p className='text-[12px] font-light'>
              By <span className='font-semibold'> {blogs[0].authorName} </span> | { createdAt }
            </p>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-7'>
          <div className='flex flex-col md:flex-row gap-7 w-full lg:w-1/2'>
            <BlogCard blog={blogs[1] as Blog} />
            <BlogCard blog={blogs[2] as Blog} />
          </div>

          <div className='flex flex-col md:flex-row gap-7 w-full lg:w-1/2'>
            <BlogCard blog={blogs[3] as Blog} />
            <BlogCard blog={blogs[4] as Blog} />
          </div>
        </div>

        {/* <Image
          src="/images/blogs_banner.jpg"
          alt="blog_banner"
          width={1500}
          height={1500}
          className='w-full h-[200px] lg:h-full object-cover mt-3 md:mt-6'
        /> */}
      </div>
    </div>
  )
}

export default CollegeBlog;