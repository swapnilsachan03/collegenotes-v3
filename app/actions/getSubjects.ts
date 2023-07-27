import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getSubjects(keywords: string, degree: string, year: string) {
  let query: any = {};

  if(keywords) query.name = { contains: keywords, mode: "insensitive" };
  if(degree) query.degree = { contains: degree, mode: "insensitive" };
  if(year) query.year = { contains: year, mode: "insensitive" };

  const subjects = await prisma.subject.findMany({
    where: query,

    orderBy: {
      createdAt: 'desc'
    },

    select: {
      id: true,
      subjectId: true,
      name: true,
      description: true,
      degree: true,
      year: true,
      notes: true,
      icon: true,
      availableNotes: true,
      views: true
    }
  });

  subjects.map(async (subject) => {
    subject.icon.url = await getObjectSignedUrl(subject.icon.name);

    await prisma.subject.update({
      where: {
        id: subject.id
      },

      data: {
        icon: {
          name: subject.icon.name,
          url: subject.icon.url
        }
      }
    });
  });

  /* const stats = await prisma.stats.findMany({
    take: 1
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id
    },

    data: {
      views: {
        increment: 1
      }
    }
  }); */

  return subjects;
}