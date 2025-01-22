import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getNotesById(notesId: string) {
  if (notesId === "") return null;

  const notes = await prisma.notes.findUnique({
    where: {
      notesId,
    },
  });

  if (!notes) {
    return null;
  }

  notes.document.url = await getObjectSignedUrl(notes.document.name);

  await prisma.notes.update({
    where: {
      notesId,
    },

    data: {
      views: notes.views + 1,
    },
  });

  const stats = await prisma.stats.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 1,
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id,
    },

    data: {
      views: {
        increment: 1,
      },

      subjectViews: {
        increment: 1,
      },
    },
  });

  return notes;
}
