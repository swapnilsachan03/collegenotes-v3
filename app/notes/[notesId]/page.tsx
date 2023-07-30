import { Metadata, ResolvingMetadata } from 'next';

import { Notes } from '@prisma/client';

import Viewer from './Viewer';
import NotFound from '@/app/not-found';
import getNotesById from '@/app/actions/getNotesById';
import { getNotesMeta } from '@/app/actions/meta/getNotesMeta';

interface IParams {
  notesId?: string
}

export async function generateMetadata(
  { params }: { params: IParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const notes = await getNotesMeta(params.notesId || '');

  if(!notes) {
    return {
      title: `404 Not Found - CollegeNotes`,
      description: 'The page you are looking for could not be found.',
    }
  }

  return {
    title: `${notes.title} - CollegeNotes`,
    description: `Read these top notch notes of ${notes.subject} contributed by ${notes.contributor} only on CollegeNotes, and ace your semester exams!`,
    keywords: `${notes.subject} notes, ${notes.title}, collegenotes, engineering notes, toppers notes`,
    authors: [{ name: notes.contributor, url: notes.contributorSocial }],
    robots: 'index, follow',

    openGraph: {
      title: `${notes.title} - CollegeNotes`,
      description: `Read these top notch notes of ${notes.subject} contributed by ${notes.contributor} only on CollegeNotes, and ace your semester exams!`,
      url: `https://www.collegenotes.co.in/notes/${notes.notesId}`,
      type: 'article',
      authors: notes.contributor,
      images: [
        {
          url: "https://www.collegenotes.co.in/images/meta-image.jpg",
          alt: notes.title
        },
      ],
    },

    twitter: {
      title: `${notes.title} - CollegeNotes`,
      description: `Read these top notch notes of ${notes.subject} contributed by ${notes.contributor} only on CollegeNotes, and ace your semester exams!`,
      card: 'summary_large_image'
    },
  }
}

const Page = async ({ params }: { params: IParams }) => {
  const notesId = params.notesId;
  const notes = await getNotesById(notesId || '');
  
  if(!notes) return (
    <NotFound />
  )
  
  return (
    <Viewer notes={notes} />
  )
}

export default Page;