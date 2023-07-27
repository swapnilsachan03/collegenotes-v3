import React from 'react';

import getAdminStats from '@/app/actions/getAdminStats';
import Dashboard from './Dashboard';
import Error from '@/app/error';


const Page = async () => {
  const data = await getAdminStats();

  if(!data) {
    return (
      <Error />
    )
  }

  return (
    <Dashboard data={data} />
  )
}

export default Page;