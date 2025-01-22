import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
  const stats = await prisma.stats
    .create({
      data: {
        users: await prisma.user.count(),
        subjects: await prisma.subject.count(),
        notes: await prisma.notes.count(),
        blogs: await prisma.blog.count(),
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    })
    .catch(err => {
      return NextResponse.json({ message: "Stats creation failed" });
    });

  return NextResponse.json({ message: "Stats created successfully" });
}
