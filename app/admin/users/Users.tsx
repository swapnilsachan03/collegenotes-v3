'use client';

import React from 'react';
import axios from 'axios';
import { FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import OutlineButton from '@/app/components/buttons/OutlineButton';
import SolidButton from '@/app/components/buttons/SolidButton';
import { User } from '@prisma/client';

interface UsersProps {
  users: User[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const changeRole = async (id: string) => {
    const res = await axios.put(`/api/admin/user/${id}`)
    .then((res) => {
      toast.success('Role updated successfully');
    })
    .catch((err) => {
      toast.error('Something went wrong')
    });
  }

  const deleteUser = async (id: string) => {
    const res = await axios.delete(`/api/admin/user/${id}`)
    .then((res) => {
      toast.success('User deleted successfully');
    })
    .catch((err) => {
      toast.error('Something went wrong');
    });
  }

  return (
    <>
      <AdminNavbar />

      <div className='
        flex flex-row
        justify-around
        min-h-[90vh]
        w-full
      '>
        <div className='
          flex flex-col
          items-center
          h-full
          mx-3 my-10
          w-[1200px]
        '>
          <h1 className='text-4xl font-extrabold pb-8 text-center'>
            Users Manager
          </h1>

          <table className='w-full'>
            <caption className='caption-bottom mt-5 text-[15px] font-medium text-neutral-600 dark:text-neutral-300'>
              All registered users in the DB
            </caption>

            <thead className='text-left'>
              <tr className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                <th className='py-4'>ID</th>
                <th className='py-4'>Name</th>
                <th className='py-4'>Email</th>
                <th className='py-4 text-right'>Role</th>
                <th className='py-4 text-right'>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                  <td className='py-4'>{user.id}</td>
                  <td className='py-4'>{user.name}</td>
                  <td className='py-4'>{user.email}</td>
                  <td className='py-4 text-right'>{user.role}</td>

                  <td className='py-4 flex flex-row gap-3 justify-end'>
                    <OutlineButton
                      color='cyan'
                      label='Change Role'
                      onClick={() => changeRole(user.id)}
                    />
                    
                    <SolidButton
                      color='red'
                      rightIcon={FaUserMinus}
                      onClick={() => deleteUser(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Users;