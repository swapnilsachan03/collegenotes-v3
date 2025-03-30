import React from 'react';
import { redirect } from 'next/navigation';

import Register from './Register';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const metadata = {
  title: 'Sign Up - CollegeNotes',
  description: "Register on CollegeNotes to access exclusive website features with along subject guides, course materials, study notes, and CollegeBlog insights to level up your exam preparation.",
  keywords: 'collegenotes, collegenotes signup, study materials, exam preparation, college subjects',
  robots: 'index, follow',

  openGraph: {
    title: 'Sign Up - CollegeNotes',
    description: "Register on CollegeNotes to access exclusive website features with along subject guides, course materials, study notes, and CollegeBlog insights to level up your exam preparation.",
    url: 'https://www.collegenotes.co.in/auth/register',
  },

  twitter: {
    title: 'Sign Up - CollegeNotes',
    description: "Register on CollegeNotes to access exclusive website features with along subject guides, course materials, study notes, and CollegeBlog insights to level up your exam preparation."
  },
}

const RegisterWrapper = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect('/user/profile');
  }

  return (
    <Register />
  )
}

export default RegisterWrapper