'use client';

import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

import { Notes } from '@prisma/client';

interface ViewerProps {
  notes: Notes;
}

const Viewer: React.FC<ViewerProps> = ({ notes }) => {
  const viewer = useRef(null);

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/lib',
          initialDoc: notes.document.url,
        },
        viewer.current!,
      ).then((instance: any) => {
          const { docViewer } = instance;
          // you can now call WebViewer APIs here...
          instance.UI.disableElements(['ribbons']);
          instance.UI.disableElements(['downloadButton', 'saveAsButton', 'printButton', 'toolsHeader', 'selectButton', 'settingsButton']);
        });
    })
  }, [notes.document.url]);

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

        <div className="h-[98vh]" ref={viewer}></div>
      </div>
    </div>
  )
}

export default Viewer;