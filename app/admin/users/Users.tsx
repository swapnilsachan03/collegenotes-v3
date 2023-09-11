'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import OutlineButton from '@/app/components/buttons/OutlineButton';
import SolidButton from '@/app/components/buttons/SolidButton';
import Modal from '@/app/components/Modal';

import { User } from '@prisma/client';
import { Role } from '@prisma/client';

type SafeUser = User & { accounts: any[] };

interface UsersProps {
  users: SafeUser[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const [role, setRole] = useState<Role>();
  const [id, setId] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const toggleRoleOpen = () => setRoleOpen(!roleOpen);

  const changeRole = async (id: string) => {
    const res = await axios.put(`/api/admin/user/${id}`, { role })
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
        flex flex-col
        items-center
        min-h-[90vh]
        w-full
      '>
        <h1 className='text-4xl font-extrabold py-10 text-center'>
          Users Manager
        </h1>

        <div className='w-full overflow-auto xl:flex xl:flex-col items-center'>
          <table className='w-[1200px] mx-5'>
            <caption className='caption-bottom mt-5 text-[15px] font-medium text-neutral-600 dark:text-neutral-300'>
              All registered users in the DB
            </caption>

            <thead className='text-left'>
              <tr className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                <th className='py-4'>Authentication</th>
                <th className='py-4'>Name</th>
                <th className='py-4'>Email</th>
                <th className='py-4 text-right'>Role</th>
                <th className='py-4 text-right'>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user: SafeUser) => (
                <tr key={user.id} className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                  <td className='py-4'>{user.accounts[0] ? user.accounts[0].provider : 'email'}</td>
                  <td className='py-4'>{user.name}</td>
                  <td className='py-4'>{user.email}</td>
                  <td className='py-4 text-right'>{user.role}</td>

                  <td className='py-4 flex flex-row gap-3 justify-end'>
                    <OutlineButton
                      color='cyan'
                      label='Change Role'
                      onClick={() => {
                        setId(user.id)
                        toggleRoleOpen()
                      }}
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

        <Modal
          modalHeader='Change Role'
          isOpen={roleOpen}
          onClose={toggleRoleOpen}
        >
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row mt-4 w-full'>
              <RoleRadio role='adder' label='Adder' onClick={() => setRole(Role.adder)} />
              <RoleRadio role='moderator' label='Moderator' onClick={() => setRole(Role.moderator)} />
            </div>

            <div className='flex flex-row mb-4 w-full'>
              <RoleRadio role='blogger' label='Blogger' onClick={() => setRole(Role.blogger)} />
              <RoleRadio role='user' label='User' onClick={() => setRole(Role.user)} />
            </div>

            <div className='flex flex-row justify-end gap-2'>
              <OutlineButton
                color='red'
                label='Cancel'
                onClick={toggleRoleOpen}
              />

              <SolidButton
                color='teal'
                label='Update'
                onClick={() => {
                  changeRole(id);
                  toggleRoleOpen();
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Users;

interface RadioProps {
  role: string;
  label: string;
  onClick?: () => void;
}

const RoleRadio: React.FC<RadioProps> = ({
  role, label, onClick
}) => {
  return (
    <div className="flex items-center w-1/2">
      <input
        id={role}
        type="radio"
        value={role}
        name="default-radio"
        className="w-4 h-4 dark:border-gray-300 dark:bg-slate-700"
        onClick={onClick}
      />

      <label htmlFor={role} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  )
}
