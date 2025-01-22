import { NextResponse } from "next/server";
import sharp from "sharp";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import {
  deleteFile,
  generateFileName,
  getObjectSignedUrl,
  uploadFile,
} from "@/app/libs/s3";

export async function POST(req: Request) {
  const formData = await req.formData();

  const email = formData.get("email")?.toString();
  const name = formData.get("name")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !name || !password) {
    return NextResponse.error();
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return Error("User already exists.");
  }

  const file = formData.get("file") as File;
  let fileName = "";

  if (file.name != undefined) {
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

  const hashedPassword = await bcrypt.hash(password!, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        avatar:
          fileName != ""
            ? {
                name: fileName,
                url: await getObjectSignedUrl(fileName),
              }
            : null,
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
        users: await prisma.user.count(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (fileName != "") await deleteFile(fileName);
    return NextResponse.error();
  }
}
