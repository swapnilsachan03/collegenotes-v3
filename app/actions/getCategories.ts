import prisma from "@/app/libs/prismadb";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  }

  catch (error: any) {
    return null;
  }
}