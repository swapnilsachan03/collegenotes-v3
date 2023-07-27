import React from 'react';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import Editor from './Editor';
import getSubjectById from '@/app/actions/getSubjectById';
import NotFound from '@/app/not-found';

interface IParams {
  subjectId: string;
}

const EditSubject = async ({ params }: { params: IParams }) => {
  const subjectId = params.subjectId;
  const res = await getSubjectById(subjectId || '');

  if(!res) return (
    <NotFound />
  )

  return (
    <>
      <AdminNavbar />
      <Editor subject={res.subject} />
    </>
  )
}

export default EditSubject;