import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export async function getSubjectMeta (subjectId: string) {
  if(subjectId === '') return null;

  const subject = await prisma.subject.findUnique({
    where: {
      subjectId
    },

    select: {
      subjectId: true,
      name: true,
      poster: true,
      seoDescription: true,
      seoKeywords: true
    }
  });

  if (!subject) {
    return null;
  }

  subject.poster.url = await getObjectSignedUrl(subject.poster.name);

  return subject;
}
