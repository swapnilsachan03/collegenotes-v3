import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { deleteFile } from "@/app/libs/s3";

interface IParams {
  userId?: string;
}

export async function PUT (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const { role } = await request.json();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { userId } = params;

  if(!userId || typeof userId != 'string') {
    throw new Error('Invalid ID');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if(!user) {
    return Error('User not found');
  }

  if(user.role === 'admin' || role === 'admin') {
    return Error('You cannot modify admin roles');
  }

  await prisma.user.update({
    where: {
      id: userId
    },

    data: {
      role
    }
  });

  return NextResponse.json({ message: "User role updated successfully" });
}

export async function DELETE (
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return NextResponse.error();
  }

  if(currentUser.role != 'admin') {
    return NextResponse.error();
  }

  const { userId } = params;

  if(!userId || typeof userId != 'string') {
    throw new Error('Invalid ID');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  if(!user) {
    return Error('User not found');
  }

  if(user.role === 'admin') {
    return Error('You cannot delete admins.');
  }

  if(user.avatar?.name) {
    await deleteFile(user.avatar.name);
  }

  await prisma.user.delete({
    where: {
      id: userId
    }
  });

  const stats = await prisma.stats.findMany({
    take: 1
  });

  await prisma.stats.update({
    where: {
      id: stats[0].id
    },

    data: {
      users: await prisma.user.count()
    }
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
