import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getBlogs() {
  // const { searchParams } = new URL(request.url);

  // const keywords = searchParams.get('keywords');
  // const category = searchParams.get('category');

  let query: any = {};

  // if(keywords) query.name = { contains: keywords, mode: "insensitive" };
  // if(category) query.category = { contains: category, mode: "insensitive" };

  const blogs = await prisma.blog.findMany({
    where: query,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      blogId: true,
      title: true,
      headline: true,
      summary: true,
      categoryName: true,
      authorName: true,
      published: true,
      poster: true,
      createdAt: true,
      views: true
    }
  });

  blogs.map(async (blog) => {
    await prisma.blog.update({
      where: {
        id: blog.id
      },

      data: {
        poster: {
          name: blog.poster.name,
          url: await getObjectSignedUrl(blog.poster.name)
        }
      }
    });
  });

  /* const stats = await prisma.stats.findMany({
    take: 1
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id
    },

    data: {
      views: {
        increment: 1
      }
    }
  }); */

  return blogs;
}
