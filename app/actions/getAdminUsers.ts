import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getAdminUsers () {
const currentUser = await getCurrentUser();

  if(!currentUser) {
    return null;
  }

  if(currentUser.role != 'admin') {
    return null;
  }

  const users = await prisma.user.findMany();

  return users;
}
