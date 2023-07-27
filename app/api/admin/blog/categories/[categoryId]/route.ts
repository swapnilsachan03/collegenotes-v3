import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";

interface IParams {
  categoryId?: string;
}

export async function PUT (
  request: Request,
  { params }: { params: IParams }
) {
  const { categoryId } = params;

  if(!categoryId || typeof categoryId != 'string') {
    throw new Error('Invalid ID');
  }

  const { newId, name, description } = await request.json();

  if(!newId || !name || !description) {
    return NextResponse.error();
  }

  await prisma.category.update({
    where: {
      categoryId
    },

    data: {
      categoryId: newId,
      name,
      description
    }
  });

  return NextResponse.json({ message: "Category updated successfully" });
}

/* export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const { categoryId } = params;

  if(!categoryId || typeof categoryId != 'string') {
    throw new Error('Invalid ID');
  }

  await prisma.category.delete({
    where: {
      categoryId
    }
  });

  return NextResponse.json({ message: "Category deleted successfully" });
} */
