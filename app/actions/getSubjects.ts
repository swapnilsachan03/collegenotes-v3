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

  for(let i = 0; i < subjects.length; i++) {
    subjects[i] = {
      ...subjects[i],
      icon: {
        url: await getObjectSignedUrl(subjects[i].icon.name),
        name: subjects[i].icon.name
      }
    }
  }

  return subjects;
}