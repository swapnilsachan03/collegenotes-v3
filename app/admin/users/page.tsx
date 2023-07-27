import React from 'react';

import Users from "./Users";
import getAdminUsers from '@/app/actions/getAdminUsers';
import { User } from '@prisma/client';
import Error from '@/app/error';

const Page = async () => {
  const users = await getAdminUsers();

  if(!users) {
    return (
      <Error />
    )
  }

  return (
    <Users users={users as User[]} />
  )
}

export default Page;