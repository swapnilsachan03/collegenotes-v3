import { NextResponse } from "next/server";

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

  if(currentUser.role != 'admin') {
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
      subjects: await prisma.blog.count()
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

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { blogId } = params;

  if(!blogId || typeof blogId != 'string') {
    throw new Error('Invalid ID');
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

  if(!title || !id || !headline || !summary || !metaDescription || !metaKeywords || !content || !categoryId || !categoryName) {
    return Error("Missing fields.");
  }

  const blog = await prisma.blog.findUnique({
    where: {
      blogId
    }
  });

  if(!blog) {
    return Error("Blog not found.");
  }

  var posterFileName = blog.poster.name;

  if(poster.name != undefined) {
    await deleteFile(blog?.poster.name as string);

    posterFileName = generateFileName(poster.name);
    const posterBuffer = Buffer.from(await poster.arrayBuffer());
    await uploadFile(posterBuffer, posterFileName, poster.type);
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
        }
      }
    });

    return NextResponse.json({ message: 'Subject updated successfully' });
  } catch (error) {
    return NextResponse.error();
  }
}
