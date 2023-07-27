import React from 'react';

import Users from "./Users";
import getAdminUsers from '@/app/actions/getAdminUsers';
import { User } from '@prisma/client';
import Error from '@/app/global-error';

export const metadata = {
  title: 'Users Manager - CollegeNotes',
  description: 'View all users and related information such as email, role, etc. on CollegeNotes. Change user roles or delete users.',
  keywords: 'collegenotes, collegenotes users manager, view all users collegenotes, collegenotes users',

  openGraph: {
    title: 'Users Manager - CollegeNotes',
    description: "View all users and related information such as email, role, etc. on CollegeNotes. Change user roles or delete users.",
    url: 'https://www.collegenotes.co.in/admin/users',
  },

  twitter: {
    title: 'Users Manager - CollegeNotes',
    description: "View all users and related information such as email, role, etc. on CollegeNotes. Change user roles or delete users."
  },
}

const Page = async () => {
  const users = await getAdminUsers();

  if(!users) {
    return (
      <Error />
    )
  }

  return (
    <Users users={users as User[]} />
  )
}

export default Page;