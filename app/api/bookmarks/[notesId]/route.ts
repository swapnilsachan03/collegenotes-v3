import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  notesId?: string;
}

export async function POST (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  const { notesId } = params;

  if(!notesId || typeof notesId != 'string') {
    throw new Error('Invalid ID');
  }

  const notes = await prisma.notes.findUnique({
    where: {
      id: notesId
    }
  });

  if(!notes) {
    return Error('Notes not found');
  }

  if(currentUser.bookmarks.includes(notes.id)) {
    return NextResponse.json({ message: 'Already bookmarked' });
  };

  const bookmarks = currentUser.bookmarks;
  bookmarks.push(notes.id);

  await prisma.user.update({
    where: {
      id: currentUser.id
    },

    data: {
      bookmarks: bookmarks
    }
  });

  return NextResponse.json({ message: 'Notes bookmarked successfully' });
}

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  const { notesId } = params;

  if(!notesId || typeof notesId != 'string') {
    throw new Error('Invalid ID');
  }

  const notes = await prisma.notes.findUnique({
    where: {
      id: notesId
    }
  });

  if(!notes) {
    return Error('Notes not found');
  }

  const bookmarks = currentUser.bookmarks.filter(bookmark => bookmark != notes.id);

  await prisma.user.update({
    where: {
      id: currentUser.id
    },

    data: {
      bookmarks: bookmarks
    }
  });

  return NextResponse.json({ message: 'Removed from bookmarks' });
}
