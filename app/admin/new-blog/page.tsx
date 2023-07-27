import React from 'react';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import BlogAdder from './BlogAdder';
import getCategories from '@/app/actions/getCategories';

const NewBlog = async () => {
  const categories = await getCategories();

  return (
    <>
      <AdminNavbar />
      <BlogAdder categories={categories!} />
    </>
  )
}

export default NewBlog;