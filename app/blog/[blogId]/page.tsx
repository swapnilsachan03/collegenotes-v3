import Image from 'next/image';
import parse from 'html-react-parser';
import { Metadata, ResolvingMetadata } from 'next';

import styles from "../../styles/Subject.module.css";

import NotFound from '@/app/not-found';
import getBlogById from '@/app/actions/getBlogById';
import getBlogMeta from '@/app/actions/meta/getBlogMeta';

interface IParams {
  blogId?: string
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
    title: `${blog.title} - CollegeBlog`,
    description: blog.metaDescription,
    keywords: blog.metaKeywords,
    authors: [{ name: blog.authorName, url: `https://www.collegenotes.co.in/blog/${blog.blogId}` }],
    robots: 'index, follow',

    openGraph: {
      title: `${blog.title} - CollegeBlog`,
      description: blog.metaDescription,
      url: `https://www.collegenotes.co.in/blog/${blog.blogId}`,
      type: 'article',
      authors: blog.authorName,
    },

    twitter: {
      title: `${blog.title} - CollegeBlog`,
      description: blog.metaDescription,
      card: 'summary_large_image'
    },
  }
}

const Page = async ({ params }: { params: IParams }) => {
  const blogId = params.blogId;
  const blog = await getBlogById(blogId || '');

  const lastUpdated = blog ? new Date(blog.updatedAt).toUTCString().slice(0, -12) : null;

  if(!blog) return (
    <NotFound />
  )

  return (
    <div
      className='
        flex
        justify-around
        w-full min-h-screen
        px-4 md:px-0
      '
    >
      <div
        className='
          flex flex-col gap-6
          py-12
          w-full
          md:w-[768px]
        '
      >
        <div>
          <h3 className='text-base font-bold font-roboto_condensed uppercase max-w-max border-b-[3px] border-black dark:border-white'>
            { blog.headline }
          </h3>

          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold font-source mt-4'>
            { blog.title }
          </h1>

          <p className='text-sm sm:text-[15px] font-light mt-4'>
            { blog.summary }
          </p>

          <p className='text-[12px] font-light mt-2'>
            By <span className='font-semibold'> {blog.authorName} </span> | Last updated: { lastUpdated }
          </p>
        </div>

        <Image
          src={blog.poster.url}
          alt={blog.title}
          width={800}
          height={800}
          className='rounded-xl w-full h-auto'
        />

        <div className={styles.content}> {parse(blog.content)} </div>
      </div>
    </div>
  )
}

export default Page;