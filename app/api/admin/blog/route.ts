import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile, generateFileName, getObjectSignedUrl, uploadFile } from "@/app/libs/s3";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
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

  if(!title || !blogId || !headline || !summary || !metaDescription || !metaKeywords || !content || !categoryId || !categoryName || !poster) {
    return Error("Missing fields.");
  }

  const posterFileName = generateFileName(poster.name);

  const posterBuffer = Buffer.from(await poster.arrayBuffer());
  await uploadFile(posterBuffer, posterFileName, poster.type);

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
        blogs: await prisma.blog.count()
      }
    });

    return NextResponse.json({ message: "Blog uploaded successfully.", blog });
  } catch (error) {
    await deleteFile(posterFileName);
    return NextResponse.error();
  }
}
