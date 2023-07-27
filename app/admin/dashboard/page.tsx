import React from 'react';

import getAdminStats from '@/app/actions/getAdminStats';
import Dashboard from './Dashboard';
import Error from '@/app/global-error';

export const metadata = {
  title: 'Admin Dashboard - CollegeNotes',
  description: 'CollegeNotes Admin Dashboard. View site visits, users count, latest changes & other necessary information.',
  keywords: 'collegenotes, collegenotes dashboard, admin dashboard collegenotes, collegenotes admin dashboard',

  openGraph: {
    title: 'Admin Dashboard - CollegeNotes',
    description: "CollegeNotes Admin Dashboard. View site visits, users count, latest changes & other necessary information.",
    url: 'https://www.collegenotes.co.in/admin/dashboard',
  },

  twitter: {
    title: 'Admin Dashboard - CollegeNotes',
    description: "CollegeNotes Admin Dashboard. View site visits, users count, latest changes & other necessary information."
  },
}

const Page = async () => {
  const data = await getAdminStats();

  if(!data) {
    return (
      <Error />
    )
  }

  return (
    <Dashboard data={data} />
  )
}

export default Page;