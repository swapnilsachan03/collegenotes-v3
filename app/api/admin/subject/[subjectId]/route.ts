import { NextResponse } from "next/server";
import sharp from "sharp";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile, generateFileName, getObjectSignedUrl, uploadFile } from "@/app/libs/s3";

interface IParams {
  subjectId?: string;
}

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { subjectId } = params;

  if(!subjectId || typeof subjectId != 'string') {
    throw new Error('Invalid ID');
  }

  const toDelete = await prisma.subject.findUnique({
    where: {
      subjectId: subjectId
    }
  });

  if(!toDelete) {
    throw new Error('Subject not found');
  }

  await deleteFile(toDelete.poster.name);
  await deleteFile(toDelete.icon.name);

  toDelete.notes.map(async element => {
    var notes = await prisma.notes.findUnique({
      where: {
        id: element
      }
    });

    await deleteFile(notes?.document.name as string);

    await prisma.notes.delete({
      where: {
        id: element
      }
    });
  });

  await prisma.subject.delete({
    where: {
      subjectId: subjectId
    }
  })

  const stats = await prisma.stats.findMany({
    take: 1
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id
    },

    data: {
      subjects: await prisma.subject.count(),
      notes: await prisma.notes.count(),
      updatedAt: new Date(Date.now())
    }
  });

  return NextResponse.json({ message: 'Subject deleted successfully' });
}

export async function PUT (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { subjectId } = params;

  if(!subjectId || typeof subjectId != 'string') {
    throw new Error('Invalid ID');
  }

  const formData = await request.formData();

  const id = formData.get("subjectId")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const seoDescription = formData.get("seoDescription")?.toString();
  const seoKeywords = formData.get("seoKeywords")?.toString();
  const beforeNotesContent = formData.get("beforeNotesContent")?.toString();
  const afterNotesContent = formData.get("afterNotesContent")?.toString();
  const degree = formData.get("degree")?.toString();
  const year = formData.get("year")?.toString();

  const poster = formData.get("poster") as File;
  const icon = formData.get("icon") as File;

  if(!id || !name || !description || !seoDescription || !seoKeywords || !beforeNotesContent || !afterNotesContent || !degree || !year) {
    return Error("Missing fields.");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      subjectId: subjectId
    }
  });

  if(!subject) {
    return Error("Subject not found.");
  }

  var posterFileName = subject.poster.name;
  var iconFileName = subject.icon.name;

  if(poster.name != undefined) {
    await deleteFile(subject?.poster.name as string);

    posterFileName = generateFileName(poster.name);
    const posterBuffer = Buffer.from(await poster.arrayBuffer());
    await uploadFile(posterBuffer, posterFileName, poster.type);
  }

  if(icon.name != undefined) {
    await deleteFile(subject?.icon.name as string);

    iconFileName = generateFileName(icon.name);
    const iconBuffer = await icon.arrayBuffer();

    await new Promise((resolve, reject) => {
      sharp(iconBuffer)
        .resize({
          width: 200,
          height: 200,
          fit: sharp.fit.cover
        })
        .toBuffer(async (err, buffer, info) => {
          if(buffer) {
            await uploadFile(buffer, iconFileName as string, icon.type);
            resolve(true);
          }
  
          else {
            return Error("Error while uploading icon.");
          }
        })
    });
  }

  try {
    await prisma.subject.update({
      where: {
        subjectId: subjectId
      },
  
      data: {
        subjectId: id,
        name,
        description,
        seoDescription,
        seoKeywords,
        beforeNotesContent,
        afterNotesContent,
        degree,
        year,
        poster: {
          name: posterFileName,
          url: await getObjectSignedUrl(posterFileName)
        },
        icon: {
          name: iconFileName,
          url: await getObjectSignedUrl(iconFileName)
        }
      }
    });

    return NextResponse.json({ message: 'Subject updated successfully' });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { subjectId } = params;

  if(!subjectId || typeof subjectId != 'string') {
    throw new Error('Invalid ID');
  }

  const formData = await request.formData();

  const id = formData.get("notesId")?.toString();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const contributor = formData.get("contributor")?.toString();
  const contributorSocial = formData.get("contributorSocial")?.toString();
  const institution = formData.get("institution")?.toString();

  const document = formData.get("document") as File;

  if(!id || !title || !institution || !document) {
    return Error("Missing fields.");
  }

  const subject = await prisma.subject.findUnique({
    where: {
      subjectId: subjectId
    }
  });

  if(!subject) {
    return Error("Subject not found.");
  }

  const documentName = generateFileName(document.name);
  const documentBuffer = Buffer.from(await document.arrayBuffer());
  await uploadFile(documentBuffer, documentName, document.type);

  try {
    const notes = await prisma.notes.create({
      data: {
        notesId: id,
        title,
        description,
        subject: subject.name,
        contributor,
        contributorSocial,
        institution,
        document: {
          name: documentName,
          url: await getObjectSignedUrl(documentName)
        }
      }
    });

    const notesArray = subject.notes;
    notesArray.push(notes.id);

    await prisma.subject.update({
      where: {
        subjectId: subjectId
      },

      data: {
        notes: notesArray,
        availableNotes: {
          increment: 1
        },
        updatedAt: new Date(Date.now())
      }
    })

    const stats = await prisma.stats.findMany({
      take: 1
    });

    await prisma.stats.update({
      where: {
        id: stats[0].id
      },

      data: {
        notes: await prisma.notes.count(),
        updatedAt: new Date(Date.now())
      }
    });

    return NextResponse.json({ message: 'Notes uploaded successfully' });
  } catch (error) {
    return NextResponse.error();
  }
}
