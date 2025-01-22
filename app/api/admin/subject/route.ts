import { NextResponse } from "next/server";
import sharp from "sharp";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {
  deleteFile,
  generateFileName,
  getObjectSignedUrl,
  uploadFile,
} from "@/app/libs/s3";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role != "admin" && currentUser.role != "moderator") {
    return NextResponse.error();
  }

  const formData = await request.formData();

  const subjectId = formData.get("subjectId")?.toString();
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

  if (
    !subjectId ||
    !name ||
    !description ||
    !seoDescription ||
    !seoKeywords ||
    !beforeNotesContent ||
    !afterNotesContent ||
    !degree ||
    !year ||
    !poster ||
    !icon
  ) {
    return Error("Missing fields.");
  }

  const posterFileName = generateFileName(poster.name);
  const iconFileName = generateFileName(icon.name);

  const posterBuffer = Buffer.from(await poster.arrayBuffer());
  const iconBuffer = await icon.arrayBuffer();
  await uploadFile(posterBuffer, posterFileName, poster.type);

  await new Promise((resolve, reject) => {
    sharp(iconBuffer)
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
      })
      .toBuffer(async (err, buffer, info) => {
        if (buffer) {
          await uploadFile(buffer, iconFileName, icon.type);
          resolve(true);
        } else {
          return Error("Error while uploading icon.");
        }
      });
  });

  try {
    const subject = await prisma.subject.create({
      data: {
        subjectId,
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
          url: await getObjectSignedUrl(posterFileName),
        },
        icon: {
          name: iconFileName,
          url: await getObjectSignedUrl(iconFileName),
        },
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
        subjects: await prisma.subject.count(),
        updatedAt: new Date(Date.now()),
      },
    });

    return NextResponse.json({
      message: "Subject created successfully.",
      subject,
    });
  } catch (error) {
    await deleteFile(posterFileName);
    await deleteFile(iconFileName);
    return NextResponse.error();
  }
}
