import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";

export async function POST (
  request: Request
) {
  const { categoryId, name, description } = await request.json();
  if(!categoryId || !name || !description) return NextResponse.error();

  const category = await prisma.category.create({
    data: {
      categoryId,
      name,
      description
    }
  });

  return NextResponse.json({ message: "Category created successfully", category });
}
