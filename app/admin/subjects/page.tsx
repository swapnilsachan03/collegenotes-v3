import React from 'react';
import getSubjects from '@/app/actions/getSubjects';
import Subjects from './Subjects';
import { Subject } from '@prisma/client';

const Page = async () => {
  const keywords = '';
  const degree = '';
  const year = '';

  const subjects = await getSubjects(keywords, degree, year);

  return (
    <Subjects subjects={subjects as Subject[]}  />
  )
}

export default Page;