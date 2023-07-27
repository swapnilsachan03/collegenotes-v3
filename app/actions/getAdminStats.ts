import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getAdminStats () {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return null;
  }

  if(currentUser.role != 'admin') {
    return null;
  }

  const stats = await prisma.stats.findMany({
    orderBy: {
      createdAt: "desc",
    },

    take: 12,
  });

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;
  
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      views: 0,
      subjects: 0,
      notes: 0,
      blogs: 0,
      subjectViews: 0,
      blogViews: 0
    })
  }

  const usersCount = statsData[11].users;
  const viewsCount = statsData[11].views;

  let usersProfit = true, viewsProfit = true;
  let usersChange = 0, viewsChange = 0;

  if(statsData[10].users === 0) usersChange = usersCount * 100;
  if(statsData[10].views === 0) viewsChange = viewsCount * 100;

  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views
    };

    usersChange = (difference.users / statsData[10].users) * 100;
    viewsChange = (difference.views / statsData[10].views) * 100;

    if(usersChange < 0) usersProfit = false;
    if(viewsChange < 0) viewsProfit = false;
  }

  return {
    stats: statsData,
    usersCount,
    viewsCount,
    usersChange,
    viewsChange,
    usersProfit,
    viewsProfit
  }
}
