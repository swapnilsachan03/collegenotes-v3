import React from 'react';

import getSubjects from '@/app/actions/getSubjects';
import Subjects from './Subjects';
import { Subject } from '@prisma/client';

export const metadata = {
  title: 'Subjects Manager - CollegeNotes',
  description: 'View all subjects and related information such as views, available notes, etc. on CollegeNotes. Edit or delete existing exisitng subjects.',
  keywords: 'collegenotes, collegenotes subjects manager, view all subjects collegenotes, collegenotes subjects',

  openGraph: {
    title: 'Subjects Manager - CollegeNotes',
    description: "View all subjects and related information such as views, available notes, etc. on CollegeNotes. Edit or delete existing exisitng subjects.",
    url: 'https://www.collegenotes.co.in/admin/subjects',
  },

  twitter: {
    title: 'Subjects Manager - CollegeNotes',
    description: "View all subjects and related information such as views, available notes, etc. on CollegeNotes. Edit or delete existing exisitng subjects."
  },
}

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