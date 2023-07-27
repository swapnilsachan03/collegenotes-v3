import React from 'react';

import getBlogs from '@/app/actions/getBlogs';
import BlogsManager from './Blogs';
import { Blog } from '@prisma/client';

const Page = async () => {
  const blogs = await getBlogs();

  return (
    <BlogsManager blogs={blogs as Blog[]} />
  )
}

export default Page;