import React from "react";

import AdminNavbar from "@/app/components/layout/AdminNavbar";
import BlogAdder from "./BlogAdder";
import getCategories from "@/app/actions/getCategories";

export const metadata = {
  title: "New Blog - CollegeBlog",
  description:
    "Write a new blog on CollegeBlog. Once you post a blog, you can edit it later too.",
  keywords:
    "collegenotes, collegenotes add blog, collegeblog add blog, new blog",

  openGraph: {
    title: "New Blog - CollegeBlog",
    description:
      "Write a new blog on CollegeBlog. Once you post a blog, you can edit it later too.",
    url: "https://www.collegenotes.co.in/admin/new-blog",
  },

  twitter: {
    title: "New Blog - CollegeBlog",
    description:
      "Write a new blog on CollegeBlog. Once you post a blog, you can edit it later too.",
  },
};

const NewBlog = async () => {
  const categories = await getCategories();

  return <BlogAdder categories={categories!} />;
};

export default NewBlog;
