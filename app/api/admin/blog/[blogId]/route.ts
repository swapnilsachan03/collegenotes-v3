import { NextResponse } from "next/server";
import sharp from "sharp";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile, generateFileName, getObjectSignedUrl, uploadFile } from "@/app/libs/s3";

interface IParams {
  blogId?: string;
}

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin' && currentUser.role != 'moderator' && currentUser.role != 'blogger') {
    return NextResponse.error();
  }

  const { blogId } = params;

  if(!blogId || typeof blogId != 'string') {
    throw new Error('Invalid ID');
  }

  const toDelete = await prisma.blog.findUnique({
    where: {
      blogId: blogId
    }
  });

  if(!toDelete) {
    throw new Error('Blog not found');
  }

  if(toDelete?.authorId != currentUser.id && currentUser.role != 'admin' && currentUser.role != 'moderator') {
    return NextResponse.error();
  }

  await deleteFile(toDelete.poster.name);

  await prisma.blog.delete({
    where: {
      blogId: blogId
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
      subjects: await prisma.blog.count(),
      updatedAt: new Date(Date.now())
    }
  });

  return NextResponse.json({ message: 'Blog deleted successfully' });
}

export async function PUT (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin' && currentUser.role != 'moderator' && currentUser.role != 'blogger') {
    return NextResponse.error();
  }

  const { blogId } = params;

  if(!blogId || typeof blogId != 'string') {
    throw new Error('Invalid ID');
  }

  const blog = await prisma.blog.findUnique({
    where: {
      blogId
    }
  });

  if(!blog) {
    return Error("Blog not found.");
  }

  if(blog.authorId != currentUser.id && currentUser.role != 'admin' && currentUser.role != 'moderator') {
    return NextResponse.error();
  }

  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const id = formData.get("blogId")?.toString();
  const headline = formData.get("headline")?.toString();
  const summary = formData.get("summary")?.toString();
  const metaDescription = formData.get("metaDescription")?.toString();
  const metaKeywords = formData.get("metaKeywords")?.toString();
  const content = formData.get("content")?.toString();
  const categoryId = formData.get("categoryId")?.toString();
  const categoryName = formData.get("categoryName")?.toString();
  const poster = formData.get("poster") as File;
  const cover = formData.get("cover") as File;

  if(!title || !id || !headline || !summary || !metaDescription || !metaKeywords || !content || !categoryId || !categoryName) {
    return Error("Missing fields.");
  }

  var posterFileName = blog.poster.name;

  if(poster.name != undefined) {
    await deleteFile(blog?.poster.name as string);

    posterFileName = generateFileName(poster.name);
    const posterBuffer = Buffer.from(await poster.arrayBuffer());
    await uploadFile(posterBuffer, posterFileName, poster.type);
  }

  let coverFileName = '';

  if(cover.name != undefined) {
    if(blog.cover) await deleteFile(blog.cover.name);

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
    await prisma.blog.update({
      where: {
        blogId: blogId
      },
  
      data: {
        blogId: id,
        title,
        headline,
        summary,
        metaDescription,
        metaKeywords,
        content,
        categoryId,
        categoryName,
        poster: {
          name: posterFileName,
          url: await getObjectSignedUrl(posterFileName)
        },
        cover: coverFileName != '' ? {
          name: coverFileName,
          url: await getObjectSignedUrl(coverFileName)
        } : blog.cover
      }
    });

    return NextResponse.json({ message: 'Subject updated successfully' });
  } catch (error) {
    return NextResponse.error();
  }
}
