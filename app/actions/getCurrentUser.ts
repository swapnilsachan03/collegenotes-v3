import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import { getObjectSignedUrl } from "../libs/s3";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },

      include: {
        blogs: {
          select: {
            id: true,
            blogId: true,
            title: true,
            categoryName: true,
            published: true,
            views: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!currentUser) {
      return null;
    }

    if (currentUser.avatar?.name) {
      currentUser.avatar.url = await getObjectSignedUrl(
        currentUser.avatar.name
      );
      return currentUser;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
}
