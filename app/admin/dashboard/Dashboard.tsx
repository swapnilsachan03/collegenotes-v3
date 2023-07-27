'use client';

import React from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import { LineChart } from './LineChart';
import { Stats } from '@prisma/client';

interface DashboardProps {
  data: any;
}

const DataCard = ({ title, quantity, quantityPercent, profit }: any) => {
  return (
    <div className='
      p-5 w-60
      border-2 shadow-md
      border-cyan-300 dark:border-cyan-700
      bg-gray-50 dark:bg-neutral-900
      rounded-xl
    '>
      <p className='font-sm'>
        { title }
      </p>

      <div className='flex flex-row items-center gap-1.5'>
        <p className='text-xl font-semibold'> {quantity} </p>
        <div className='flex flex-row items-center'>
          <p className='text-md'> {quantityPercent}% </p>
          { profit ?
            <RiArrowUpLine color='green' /> :
            <RiArrowDownLine color='red' />
          }
        </div>
      </div>

      <p className='text-sm opacity-70'>
        Since last month
      </p>
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const { stats, usersCount, viewsCount, usersChange, viewsChange, usersProfit, viewsProfit } = data;

  return (
    <>
      <AdminNavbar />
      <div className='
        flex flex-col
        items-center
        w-full
        min-h-screen
      '>
        <div className='
          flex flex-col
          items-center
          w-full xl:max-w-6xl
          mx-3 min-h-screen
          py-8
        '>
          <p className='text-center text-sm mb-6 opacity-50'>
            Last change was on mangalvaar
            {/* Last change was on {new Date(stats[11].createdAt).toDateString()}, {new Date(stats[11].createdAt).toLocaleTimeString()} */}
          </p>

          <h1 className='text-4xl font-extrabold pb-8 text-center'>
            Dashboard
          </h1>

          <div className='
            flex flex-col
            lg:flex-row
            justify-center
            w-full
            gap-8
          '>
            <DataCard title={"Views"} quantity={viewsCount} quantityPercent={viewsChange} profit={viewsProfit} />
            <DataCard title={"Members"} quantity={usersCount} quantityPercent={usersChange} profit={usersProfit} />
          </div>

          <div className='w-full p-0 sm:p-2 mt-16'>
            <LineChart
              subjectViews={stats.map((item: Stats) => item.subjectViews)}
              blogViews={stats.map((item: Stats) => item.blogViews)}
              totalViews={stats.map((item: Stats) => item.views)}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
