import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getBlogMeta(blogId: string) {
  if (blogId === "") return null;

  const blog = await prisma.blog.findUnique({
    where: {
      blogId,
    },

    select: {
      blogId: true,
      title: true,
      metaDescription: true,
      metaKeywords: true,
      poster: true,
      authorName: true,
    },
  });

  if (!blog) {
    return null;
  }

  blog.poster.url = await getObjectSignedUrl(blog.poster.name);

  return blog;
}
