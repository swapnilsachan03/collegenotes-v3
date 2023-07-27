import React from 'react';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import NotesManager from './NotesManager';
import { Notes, Subject } from '@prisma/client';
import getSubjectById from '@/app/actions/getSubjectById';
import NotFound from '@/app/not-found';

interface IParams {
  subjectId: string;
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