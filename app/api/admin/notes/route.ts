import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile } from "@/app/libs/s3";

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role != "admin") {
    return NextResponse.error();
  }

  const body = await request.json();
  const subjectId = body.subjectId;
  const notesId = body.notesId;

  if (
    !subjectId ||
    typeof subjectId != "string" ||
    !notesId ||
    typeof notesId != "string"
  ) {
    throw new Error("Invalid subject or notes ID");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
    },
  });

  const toDelete = await prisma.notes.findUnique({
    where: {
      id: notesId,
    },
  });

  if (!toDelete || !subject) {
    throw new Error("Subject or notes not found");
  }

  await deleteFile(toDelete.document.name);

  const notesArray = subject.notes.filter(element => {
    if (element !== notesId) {
      return element;
    }
  });

  await prisma.notes.delete({
    where: {
      id: notesId,
    },
  });

  await prisma.subject.update({
    where: {
      id: subjectId,
    },

    data: {
      notes: notesArray,
      availableNotes: {
        decrement: 1,
      },
      updatedAt: new Date(Date.now()),
    },
  });

  const stats = await prisma.stats.findMany({
    take: 1,
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id,
    },

    data: {
      notes: await prisma.notes.count(),
      updatedAt: new Date(Date.now()),
    },
  });

  return NextResponse.json({ message: "Notes deleted successfully" });
}
