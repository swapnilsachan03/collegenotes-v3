import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import AdminNavbar from '@/app/components/layout/AdminNavbar';
import BlogEditor from './BlogEditor';
import NotFound from '@/app/not-found';

import getBlogById from '@/app/actions/getBlogById';
import getCategories from '@/app/actions/getCategories';
import getBlogMeta from '@/app/actions/meta/getBlogMeta';

interface IParams {
  blogId: string;
}

export async function generateMetadata (
  { params }: { params: IParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog = await getBlogMeta(params.blogId || '');

  if(!blog) {
    return {
      title: `404 Not Found - CollegeBlog`,
      description: 'The page you are looking for could not be found.',
    }
  }

  return {
    title: `Edit ${blog.title} - CollegeBlog`,
    description: blog.metaDescription,
    keywords: blog.metaKeywords,
    authors: [{ name: blog.authorName, url: `https://www.collegenotes.co.in/blog/${blog.blogId}` }],
    robots: 'index, follow',

    openGraph: {
      title: `Edit ${blog.title} - CollegeBlog`,
      description: blog.metaDescription,
      url: `https://www.collegenotes.co.in/blog/${blog.blogId}`,
      type: 'article',
      authors: blog.authorName,
    },

    twitter: {
      title: `Edit ${blog.title} - CollegeBlog`,
      description: blog.metaDescription,
      card: 'summary_large_image'
    },
  }
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