'use client'

import React from 'react';
import axios from 'axios';
import Link from 'next/link';

import { FiArrowUpRight } from 'react-icons/fi';
import { RiDeleteBin3Fill } from 'react-icons/ri';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import OutlineButton from '@/app/components/buttons/OutlineButton';
import SolidButton from '@/app/components/buttons/SolidButton';
import { Blog } from '@prisma/client';
import { toast } from 'react-hot-toast';

interface BlogsManagerProps {
  blogs: Blog[];
}

const BlogsManager: React.FC<BlogsManagerProps> = async ({
  blogs
}) => {

  const deleteBlog = async (blogId: string) => {
    await axios.delete(`/api/admin/blog/${blogId}`)
    .then(() => {
      toast.success('Blog deleted successfully!');
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
            Blog Manager
          </h1>

          <table className='w-full'>
            <caption className='caption-bottom mt-5 text-[15px] font-medium text-neutral-600 dark:text-neutral-300'>
              All saved blogs in the DB
            </caption>

            <thead className='text-left'>
              <tr className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                <th className='py-4'>Blog ID</th>
                <th className='py-4'>Blog Title</th>
                <th className='py-4'>Category</th>
                <th className='py-4'>Author</th>
                <th className='py-4 text-right'>Published</th>
                <th className='py-4 text-right'>Views</th>
                <th className='py-4 text-right'>Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog: Blog) => (
                <tr key={blog.id} className='border-b-[1px] border-gray-100 dark:border-neutral-700'>
                  <td className='py-4'>{blog.blogId}</td>
                  <td className='py-4'>{blog.title}</td>
                  <td className='py-4'>{blog.categoryName}</td>
                  <td className='py-4'>{blog.authorName}</td>
                  <td className='py-4 text-right'> { blog.published == true ? "Yes" : "No" } </td>
                  <td className='py-4 text-right'> { blog.views } </td>

                  <td className='py-4 flex flex-row gap-3 justify-end'>
                    <Link
                      href={`/admin/edit-blog/${blog.blogId}`}
                      target='_blank'
                    >
                      <OutlineButton
                        color='cyan'
                        label='Edit'
                        rightIcon={FiArrowUpRight}
                      />
                    </Link>
                    
                    <SolidButton
                      color='red'
                      rightIcon={RiDeleteBin3Fill}
                      onClick={() => deleteBlog(blog.blogId)}
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

export default BlogsManager;