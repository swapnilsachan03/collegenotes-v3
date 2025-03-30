import React from 'react';

import SearchBar from '@/app/components/SearchBar';
import SubjectCard from './SubjectCard';
import getSubjects from '../actions/getSubjects';

export const metadata = {
  title: 'Subject Browser - CollegeNotes',
  description: 'Discover a wide range of academic subjects on CollegeNotes Subject Browser. Effortlessly search for study materials, notes, and resources by using keywords, degree, and year filters.',
  keywords: 'collegenotes, browse subjects, engineering subjects, engineering notes, toppers notes',
  robots: 'index, follow',

  openGraph: {
    title: 'Subject Browser - CollegeNotes',
    description: "Discover a wide range of academic subjects on CollegeNotes Subject Browser. Effortlessly search for study materials, notes, and resources by using keywords, degree, and year filters.",
    url: 'https://www.collegenotes.co.in/subjects',
  },

  twitter: {
    title: 'Subject Browser - CollegeNotes',
    description: "Discover a wide range of academic subjects on CollegeNotes Subject Browser. Effortlessly search for study materials, notes, and resources by using keywords, degree, and year filters."
  },
}

interface ISubjectParams {
  keywords?: string;
  degree?: string;
  year?: string;
}

interface SubjectBrowserProps {
  searchParams: ISubjectParams;
}

const Subject = async ({ searchParams }: SubjectBrowserProps) => {
  const { keywords, degree, year } = searchParams;
  const subjects = await getSubjects(keywords || '', degree || '', year || '');

  return (
    <div
      className='
        flex flex-col gap-10
        w-full
        min-h-[95vh]
        px-4
        md:px-8
        lg:px-16
        xl:px-48
        2xl:px-96
        py-14
      '
    >
      <h1 className='text-4xl sm:text-[40px] leading-5 md:text-5xl font-bold text-center'>
        Subject Browser
      </h1>

      <SearchBar />

      { subjects.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-0.5 mt-6'>
          <h2 className='text-2xl font-bold'>No subjects found</h2>
          <p className='text-lg opacity-70 font-light'>Try searching for something else.</p>
        </div>
      ) : (
        <div
          className='
            grid grid-flow-row
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            w-full
            gap-4
          '
        >
          { subjects.map((subject: any) => {
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Subject;