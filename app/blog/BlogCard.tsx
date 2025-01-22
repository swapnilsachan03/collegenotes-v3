import { Blog } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="flex flex-row lg:flex-col justify-start gap-3 lg:gap-2 w-full lg:w-[50%]">
      <div className="w-[200px] sm:w-[250px] md:w-1/2 lg:w-full">
        <Image
          unoptimized
          alt={blog.title}
          src={blog.cover ? blog.cover.url : blog.poster.url}
          width={500}
          height={500}
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 w-1/2 lg:w-full">
        <a
          href={`/blog/${blog.blogId}`}
          className="text-lg md:text-xl font-bold font-source hover:underline mt-1"
        >
          {blog.title}
        </a>

        <p className="text-[13px] lg:text-sm font-light">{blog.summary}</p>
      </div>
    </div>
  );
};

export default BlogCard;
