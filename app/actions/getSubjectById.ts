import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";
import { Notes } from "@prisma/client";

export default async function getSubjectById(subjectId: string) {
  if (subjectId === "") return null;

  const subject = await prisma.subject.findUnique({
    where: {
      subjectId,
    },
  });

  if (!subject) {
    return null;
  }

  subject.icon.url = await getObjectSignedUrl(subject.icon.name);
  subject.poster.url = await getObjectSignedUrl(subject.poster.name);

  var notes: Notes[] = [];

  for (const notesId of subject.notes) {
    const element = await prisma.notes.findUnique({
      where: {
        id: notesId,
      },
    });

    notes.push(element as Notes);
  }

  await prisma.subject.update({
    where: {
      subjectId,
    },

    data: {
      views: subject.views + 1,
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

  return { subject, notes };
}
