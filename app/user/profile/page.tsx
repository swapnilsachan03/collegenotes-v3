import React, { Fragment, use } from 'react';
import ProfileViewer from './ProfileViewer';

import getCurrentUser from '@/app/actions/getCurrentUser';
import { Notes, Subject, User } from '@prisma/client';
import prisma from "@/app/libs/prismadb";
import Error from '@/app/global-error';

export const metadata = {
  title: 'Member Profile - CollegeNotes',
  description: 'CollegeNotes member profile page - view your bookmarks and favorites, and edit your profile here.',
  robots: 'noindex, nofollow',

  openGraph: {
    title: 'Member Profile - CollegeNotes',
    description: "CollegeNotes member profile page - view your bookmarks and favorites, and edit your profile here.",
    url: 'https://www.collegenotes.co.in/user/profile',
  },

  twitter: {
    title: 'Member Profile - CollegeNotes',
    description: "CollegeNotes member profile page - view your bookmarks and favorites, and edit your profile here."
  },
}

const Profile = async () => {
  const user = await getCurrentUser() as User;

  if(!user) return (
    <Error />
  )

  let bookmarks: Notes[] = [];
  let favorites: Subject[] = [];

  for(let i = 0; i < user.favorites.length; i++) {
    const subject = await prisma.subject.findUnique({
      where: {
        id: user.favorites[i]
      }
    });
  
    favorites.push(subject!);
  }

  for(let i = 0; i < user.bookmarks.length; i++) {
    const notes = await prisma.notes.findUnique({
      where: {
        id: user.bookmarks[i]
      }
    });

    bookmarks.push(notes!);
  }

  return (
    <ProfileViewer
      user={user as User}
      favorites={favorites}
      bookmarks={bookmarks}
    />
  )
}

export default Profile;