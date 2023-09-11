import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import NotesManager from './NotesManager';
import NotFound from '@/app/not-found';

import { Notes, Subject } from '@prisma/client';
import getSubjectById from '@/app/actions/getSubjectById';
import { getSubjectMeta } from '@/app/actions/meta/getSubjectMeta';

interface IParams {
  subjectId: string;
}

export async function generateMetadata(
  { params }: { params: IParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const subject = await getSubjectMeta(params.subjectId || '');

  if(!subject) {
    return {
      title: `404 Not Found - CollegeNotes`,
      description: 'The page you are looking for could not be found.',
    }
  }

  return {
    title: `Manage ${subject.name} Notes - CollegeNotes`,
    description: subject.seoDescription,
    keywords: subject.seoKeywords,
    robots: 'index, follow',

    openGraph: {
      title: `Manage ${subject.name} Notes - CollegeNotes`,
      description: subject.seoDescription,
      url: `https://www.collegenotes.co.in/admin/notes/${subject.subjectId}`,
      type: 'website'
    },

    twitter: {
      title: `Manage ${subject.name} Notes - CollegeNotes`,
      description: subject.seoDescription,
      card: 'summary_large_image'
    },
  }
}

const HOC = async ({ params }: { params: IParams }) => {
  const res = await getSubjectById(params.subjectId);

  if(!res) return (
    <NotFound />
  )

  const subject: Subject = res.subject;
  const notes: Notes[] = res.notes;

  return (
    <>
      <AdminNavbar />
      <NotesManager
        subject={subject}
        notes={notes}
      />
    </>
  )
}

export default HOC;