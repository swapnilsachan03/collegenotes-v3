import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  subjectId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { subjectId } = params;

  if (!subjectId || typeof subjectId != "string") {
    throw new Error("Invalid ID");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
    },
  });

  if (!subject) {
    return Error("Subject not found");
  }

  if (currentUser.favorites.includes(subject.id)) {
    return NextResponse.json({ message: "Already in favorites" });
  }

  const favorites = currentUser.favorites;
  favorites.push(subject.id);

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },

    data: {
      favorites: favorites,
    },
  });

  return NextResponse.json({ message: "Added to favorites" });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { subjectId } = params;

  if (!subjectId || typeof subjectId != "string") {
    throw new Error("Invalid ID");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
    },
  });

  if (!subject) {
    return Error("Subject not found");
  }

  const favorites = currentUser.favorites.filter(
    favorite => favorite != subject.id
  );

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },

    data: {
      favorites: favorites,
    },
  });

  return NextResponse.json({ message: "Removed from favorites" });
}
