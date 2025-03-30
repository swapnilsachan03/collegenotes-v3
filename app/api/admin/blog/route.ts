import { NextResponse } from "next/server";
import sharp from "sharp";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile, generateFileName, getObjectSignedUrl, uploadFile } from "@/app/libs/s3";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin' && currentUser.role != 'moderator' && currentUser.role != 'blogger') {
    return NextResponse.error();
  }

  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const blogId = formData.get("blogId")?.toString();
  const headline = formData.get("headline")?.toString();
  const summary = formData.get("summary")?.toString();
  const metaDescription = formData.get("metaDescription")?.toString();
  const metaKeywords = formData.get("metaKeywords")?.toString();
  const content = formData.get("content")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const categoryName = formData.get("categoryName")?.toString();
  const poster = formData.get("poster") as File;
  const cover = formData.get("cover") as File;

  if(!title || !blogId || !headline || !summary || !metaDescription || !metaKeywords || !content || !categoryId || !categoryName || !poster) {
    return Error("Missing fields.");
  }

  const posterFileName = generateFileName(poster.name);

  const posterBuffer = Buffer.from(await poster.arrayBuffer());
  await uploadFile(posterBuffer, posterFileName, poster.type);

  let coverFileName = '';

  if(cover.name != undefined) {
    const fileBuffer = await cover.arrayBuffer();
    coverFileName = generateFileName(cover.name);

    await new Promise((resolve, reject) => {
      sharp(fileBuffer)
        .resize({
          width: 800,
          fit: sharp.fit.cover
        })
        .toBuffer(async (err, buffer, info) => {
          if(buffer) {
            await uploadFile(buffer, coverFileName, cover.type);
            resolve(true);
          }

          else {
            return Error("Error while uploading image.");
          }
        })
    })
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        blogId,
        headline,
        summary,
        metaDescription,
        metaKeywords,
        content,
        poster: {
          name: posterFileName,
          url: await getObjectSignedUrl(posterFileName)
        },
        cover: coverFileName != '' ? {
          name: coverFileName,
          url: await getObjectSignedUrl(coverFileName)
        } : null,
        authorId: currentUser.id,
        authorName: currentUser.name!,
        authorImage: currentUser.avatar ? currentUser.avatar : null,
        categoryId,
        categoryName,
        published: true
      }
    });

    const stats = await prisma.stats.findMany({
      take: 1
    });

    await prisma.stats.update({
      where: {
        id: stats[0].id
      },

      data: {
        blogs: await prisma.blog.count(),
        updatedAt: new Date(Date.now())
      }
    });

    return NextResponse.json({ message: "Blog uploaded successfully.", blog });
  } catch (error) {
    await deleteFile(posterFileName);
    return NextResponse.error();
  }
}
