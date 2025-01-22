import { NextResponse, userAgent } from "next/server";
import sharp from "sharp";

import prisma from "@/app/libs/prismadb";
import {
  deleteFile,
  generateFileName,
  getObjectSignedUrl,
  uploadFile,
} from "@/app/libs/s3";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const formData = await req.formData();

  const name = formData.get("name")?.toString();
  const file = formData.get("file") as File;

  if (!name && !file) {
    return NextResponse.error();
  }

  let fileName = "";

  if (file.name != undefined) {
    if (currentUser.avatar) await deleteFile(currentUser.avatar.name);

    const fileBuffer = await file.arrayBuffer();
    fileName = generateFileName(file.name);

    await new Promise((resolve, reject) => {
      sharp(fileBuffer)
        .resize({
          width: 500,
          height: 500,
          fit: sharp.fit.cover,
        })
        .toBuffer(async (err, buffer, info) => {
          if (buffer) {
            await uploadFile(buffer, fileName, file.type);
            resolve(true);
          } else {
            return Error("Error while uploading image.");
          }
        });
    });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },

      data: {
        name,
        avatar:
          fileName != ""
            ? {
                name: fileName,
                url: await getObjectSignedUrl(fileName),
              }
            : currentUser.avatar,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (fileName != "") await deleteFile(fileName);
    return NextResponse.error();
  }
}
