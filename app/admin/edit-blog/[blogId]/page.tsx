import React from 'react';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import BlogEditor from './BlogEditor';
import getCategories from '@/app/actions/getCategories';
import getBlogById from '@/app/actions/getBlogById';
import NotFound from '@/app/not-found';

interface IParams {
  blogId: string;
}

const NewBlog = async ({ params }: { params: IParams }) => {
  const categories = await getCategories();
  const blog = await getBlogById(params.blogId);

  if(!blog) {
    return <NotFound />
  }

  return (
    <>
      <AdminNavbar />
      <BlogEditor categories={categories!} blog={blog} />
    </>
  )
}

export default NewBlog;