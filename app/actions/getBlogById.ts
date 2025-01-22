import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getBlogById(blogId: string) {
  if (blogId === "") return null;

  const blog = await prisma.blog.findUnique({
    where: {
      blogId,
    },
  });

  if (!blog) {
    return null;
  }

  blog.poster.url = await getObjectSignedUrl(blog.poster.name);

  await prisma.blog.update({
    where: {
      blogId,
    },

    data: {
      views: blog.views + 1,
    },
  });

  const stats = await prisma.stats.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 1,
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id,
    },

    data: {
      views: {
        increment: 1,
      },
      blogViews: {
        increment: 1,
      },
    },
  });

  return blog;
}
