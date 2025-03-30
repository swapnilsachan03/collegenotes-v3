import React from 'react';
import { redirect } from 'next/navigation';

import ChangePassword from '@/app/user/change-password/page';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const metadata = {
  title: 'Forgot Password - CollegeNotes',
  description: 'Recover your CollegeNotes account password. Continue to get a reset link on your registered email to change your password.',
  keywords: 'collegenotes, collegenotes login, study materials, exam preparation, college subjects',
  robots: 'index, follow',

  openGraph: {
    title: 'Forgot Password - CollegeNotes',
    description: 'Recover your CollegeNotes account password. Continue to get a reset link on your registered email to change your password.',
    url: 'https://www.collegenotes.co.in/auth/login',
  },

  twitter: {
    title: 'Forgot Password - CollegeNotes',
    description: 'Recover your CollegeNotes account password. Continue to get a reset link on your registered email to change your password.',
  },
}

const Page = async () => {
  const user = await getCurrentUser();

  if(user) {
    redirect('/user/profile');
  }

  return (
    <ChangePassword />
  )
}

export default Page;