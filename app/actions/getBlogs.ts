import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "@/app/libs/s3";

export default async function getBlogs() {
  // const { searchParams } = new URL(request.url);

  // const keywords = searchParams.get('keywords');
  // const category = searchParams.get('category');

  let query: any = {};

  // if(keywords) query.name = { contains: keywords, mode: "insensitive" };
  // if(category) query.category = { contains: category, mode: "insensitive" };

  let blogs = await prisma.blog.findMany({
    where: query,
    orderBy: {
      createdAt: "desc",
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
      cover: true,
      createdAt: true,
      views: true,
    },
  });

  for (let i = 0; i < blogs.length; i++) {
    blogs[i] = {
      ...blogs[i],
      poster: {
        url: await getObjectSignedUrl(blogs[i].poster.name),
        name: blogs[i].poster.name,
      },
      cover: blogs[i].cover
        ? {
            url: await getObjectSignedUrl(blogs[i].cover!.name),
            name: blogs[i].cover!.name,
          }
        : null,
    };
  }

  return blogs;
}
