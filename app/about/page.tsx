import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import Avatar from '../components/Avatar';
import OutlineButton from '../components/buttons/OutlineButton';

export const metadata = {
  title: 'About Us - CollegeNotes',
  description: 'Learn more about our mission to empower university students with top-notch subject guides, comprehensive course materials, and invaluable study notes for exam excellence. And more about CollegeBlog.',
  keywords: 'collegenotes, about collegenotes, study materials, exam preparation, college subjects',
  robots: 'index, follow',

  openGraph: {
    title: 'About Us - CollegeNotes',
    description: 'Learn more about our mission to empower university students with top-notch subject guides, comprehensive course materials, and invaluable study notes for exam excellence. And more about CollegeBlog.',
    url: 'https://www.collegenotes.co.in/about',
  },

  twitter: {
    title: 'About Us - CollegeNotes',
    description: 'Learn more about our mission to empower university students with top-notch subject guides, comprehensive course materials, and invaluable study notes for exam excellence. And more about CollegeBlog.',
  },
}

const About = () => {
  return (
    <>
      <div className='
        flex
        items-center
        justify-center
        w-full h-44 sm:h-60
        bg-about
      '>
        <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold text-white'> Made in a college. </h1>
      </div>

      <div className='
        flex flex-col gap-14
        w-full
        px-4
        md:px-8
        lg:px-16
        xl:px-48
        2xl:px-96
        py-10 md:py-14
      '>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
          <div className='flex items-start w-full md:w-1/4 lg:w-1/5'>
            <h4 className='font-semibold border-b-2 border-black dark:border-white'>
              About CollegeNotes
            </h4>
          </div>

          <div className='w-full md:w-3/4 lg:w-4/5'>
            <p className='text-justify'>
              CollegeNotes began with a simple idea of sharing the discrete mathematics notes that I was making during the third semester of my college. At that time, I didn't know much about development, so I made a simple HTML and CSS powered static website by linking a few webpages, made it live and called it a day. But it was the time when that simple website got immense traffic and positive response that I understood the potential of that idea. I was overwhelmed by the requests for more content that I was getting from my friends and other people. So I decided to make it a full-fledged website and take it on as a full-time side project.

              <br/><br/>

              Three months later, I started working on it and developed it end-to-end. I added a lot of features on the admin as well as the client side (such as dark and light themes, a search bar, an authentication system, features for favoriting subjects and bookmarking notes for users, and interactive subject, notes & user management systems on the admin side). I also tried to make the UI more minimal and user-friendly.
            
              <br/><br/>

              Till now, only I have been working on this website, but I am planning to make it a community-driven project and make it a platform for students to share their notes and other study materials. I am also planning to add a lot of features to this website in the future, and maybe roll out mobile apps for better accessibility.
            
              <br/><br/>

              With all of this being said, any inputs or suggestions are always welcomed through my social media channels.
            </p>
          </div>
        </div>
        
        <div className='flex flex-col md:flex-row gap-6 md:gap-8 w-full'>
          <div className='flex items-start w-full md:w-1/4 lg:w-1/5'>
            <h4 className='font-semibold border-b-2 border-black dark:border-white'>
              Tech Stack
            </h4>
          </div>

          <div className='w-full md:w-3/4 lg:w-4/5'>
            <p className='text-justify'>
              When I started out with the development of this website, I planned on using NextJS and Tailwind CSS for the frontend and NodeJS for the backend. But I didn't know much about these technologies at that time, so as I started moving forward, I realized that I was making a lot of mistakes and the code was getting very messy. Owing to that, I made changes to the frameworks and libraries that I was going to use and settled with this tech stack:
            </p>

            <br/>
            
            <ul className='list-disc list-inside'>
              <li>NextJS & Tailwind CSS for front-end development</li>
              <li>Zustand for state management</li>
              <li>ExpressJS with NodeJS for back-end development</li>
              <li>MongoDB as a database</li>
              <li>Various JavaScript libraries such as React Quill, Bcrypt, Sharp, Mongoose, etc.</li>
            </ul>
          </div>
        </div>

        <hr/>

        <div className='flex flex-row md:gap-12 lg:gap-20 w-full'>
          <div className='flex flex-col gap-6 md:gap-10 items-start w-full md:w-3/4'>
            <h4 className='font-semibold border-b-2 border-black dark:border-white'>
              Message from the founder.
            </h4>

            <div className='md:hidden flex flex-col gap-4 items-center justify-center w-full md:w-1/4'>
              <Avatar
                src='/images/founder.jpg'
                alt='Avatar'
                size={40}
              />

              <p className='w-full text-sm text-neutral-500 text-center'>
                Swapnil Sachan <br/>
                Creator of CollegeNotes
              </p>
            </div>

            <p className='text-justify'>
              The development of this website has required a lot of efforts and has costed me a whole semester of my college life. The constant maintenance efforts are even more tough to carry on with. If you are getting benefitted by this platform in some way and want to support me and this website, you can do so by donating to me through the donations page of this website only. Any amount of donation is appreciated and will be used to maintain this website and to add more features to it. Thank you for your support!

              <br/><br/>

              <a href='/donate'>
                <OutlineButton
                  color='teal'
                  label='Donate'
                  rightIcon={RiArrowRightUpLine}
                />
              </a>
            </p>
          </div>

          <div className='hidden md:flex flex-col gap-4 items-center justify-center w-1/4'>
            <Avatar
              src='/images/founder.jpg'
              alt='Avatar'
              size={48}
            />

            <p className='w-full text-sm text-neutral-500 text-center'>
              Swapnil Sachan <br/>
              Creator of CollegeNotes
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <p className='text-[13px] text-center'>
            Made with ❤️ in TypeScript<br/>
            Hosted on Vercel, stored on Amazon S3
          </p>
        </div>
      </div>
    </>
  )
}

export default About