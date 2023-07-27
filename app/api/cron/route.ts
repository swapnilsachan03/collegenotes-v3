import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST (
  req: Request,
) {
  const stats = await prisma.stats.create({
    data: {
      users: await prisma.user.count(),
      subjects: await prisma.subject.count(),
      notes: await prisma.notes.count(),
      blogs: await prisma.blog.count(),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now())
    }
  });

  return NextResponse.json({ message: "Stats created successfully" });
}
