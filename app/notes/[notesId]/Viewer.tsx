'use client';

import PdfViewer from "./PdfViewer";

import { Notes } from '@prisma/client';

interface ViewerProps {
  notes: Notes;
}

const Viewer: React.FC<ViewerProps> = ({ notes }) => {
  return (
    <div
      className='
        flex
        justify-around
        w-full min-h-screen
        px-4 md:px-0
      '
    >
      <div
        className='
          flex flex-col gap-6
          py-12
          w-full
          md:w-[768px]
          lg:w-[850px]
        '
      >
        <div>
          <h3 className='text-base font-bold font-roboto_condensed uppercase max-w-max border-black dark:border-white border-b-[3px]'>
            { notes.subject }
          </h3>

          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold font-source mt-4'>
            { notes.title }
          </h1>

          <p className='text-[13px] font-light mt-2'>
            Contributed by: {' '}
            <a
              href={notes.contributorSocial}
              target='_blank'
              rel='noopener noreferrer'
              className='text-teal-600 dark:text-teal-400 font-medium hover:underline'
            >
              {notes.contributor}
            </a>
          </p>
        </div>

        <p className='font-lusitana text-[17px] leading-6'>
          { notes.description }
        </p>

        <PdfViewer url={notes.document.url} />
      </div>
    </div>
  )
}

export default Viewer;
