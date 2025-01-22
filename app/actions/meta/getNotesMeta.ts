import prisma from "@/app/libs/prismadb";

export async function getNotesMeta(notesId: string) {
  if (notesId === "") return null;

  const notes = await prisma.notes.findUnique({
    where: {
      notesId,
    },

    select: {
      notesId: true,
      title: true,
      description: true,
      subject: true,
      contributor: true,
      contributorSocial: true,
    },
  });

  if (!notes) {
    return null;
  }

  return notes;
}
