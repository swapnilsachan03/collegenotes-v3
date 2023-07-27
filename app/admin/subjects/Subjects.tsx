'use client'

import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { FiArrowUpRight } from 'react-icons/fi';
import { RiDeleteBin3Fill } from 'react-icons/ri';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import OutlineButton from '@/app/components/buttons/OutlineButton';
import SolidButton from '@/app/components/buttons/SolidButton';
import { Subject } from '@prisma/client';

interface SubjectsProps {
  subjects: Subject[];
}

const Subjects: React.FC<SubjectsProps> = ({ subjects }) => {
  const deleteSubject = async (id: string) => {
    await axios.delete(`/api/admin/subject/${id}`)
    .then(() => {
      toast.success('Subject deleted successfully!');
      window.location.reload();
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
            Subjects Manager
          </h1>

          <table className='w-full'>
            <caption className='caption-bottom mt-5 text-[15px] font-medium text-neutral-600 dark:text-neutral-300'>
              All saved subjects in the DB
            </caption>

            <thead className='text-left'>
              <tr className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                <th className='py-4'>Subject ID</th>
                <th className='py-4'>Subject Name</th>
                <th className='py-4'>Degree & Year</th>
                <th className='py-4 text-right'>Views</th>
                <th className='py-4 text-right'>Notes</th>
                <th className='py-4 text-right'>Action</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                  <td className='py-4'>{subject.subjectId}</td>
                  <td className='py-4'>{subject.name}</td>
                  <td className='py-4'>{subject.degree}, {subject.year} Year</td>
                  <td className='py-4 text-right'>{subject.views}</td>
                  <td className='py-4 text-right'>{subject.notes.length}</td>

                  <td className='py-4 flex flex-row gap-3 justify-end'>
                    <Link href={`/admin/edit-subject/${subject.subjectId}`}>
                      <OutlineButton
                        color='cyan'
                        label='Edit'
                        rightIcon={FiArrowUpRight}
                      />
                    </Link>
                    
                    <SolidButton
                      color='red'
                      rightIcon={RiDeleteBin3Fill}
                      onClick={() => deleteSubject(subject.subjectId)}
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

export default Subjects;