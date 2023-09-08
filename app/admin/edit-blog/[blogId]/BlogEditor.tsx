'use client';

import axios from 'axios';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { RiDraftFill, RiImageAddFill } from 'react-icons/ri';
import { MdPublish } from 'react-icons/md';
import { FaPaintRoller } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';

import OutlinedInput from '@/app/components/inputs/OutlinedInput';
import SolidButton from '@/app/components/buttons/SolidButton';
import OutlinedTextArea from '@/app/components/inputs/OutlinedTextArea';
import OutlineButton from '@/app/components/buttons/OutlineButton';

import { Blog, Category } from '@prisma/client';

interface BlogEditorProps {
  categories: Category[];
  blog: Blog;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ categories, blog }) => {
  const editorRef = useRef<any>(null);

  const id = blog.blogId;
  
  const [title, setTitle] = useState(blog.title);
  const [blogId, setBlogId] = useState(blog.blogId);
  const [headline, setHeadline] = useState(blog.headline);
  const [summary, setSummary] = useState(blog.summary);
  const [metaDescription, setMetaDescription] = useState(blog.metaDescription);
  const [metaKeywords, setMetaKeywords] = useState(blog.metaKeywords);
  const [content, setContent] = useState(blog.content);
  const [categoryId, setCategoryId] = useState(blog.categoryId);
  const [categoryName, setCategoryName] = useState(blog.categoryName);
  const [poster, setPoster] = useState<File>();
  const [posterPrev, setPosterPrev] = useState(blog.poster.url);
  const [cover, setCover] = useState<File>();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const myForm = new FormData();

    if(editorRef.current) {
      const content = editorRef.current.getContent();
      myForm.append("content", content);
    }

    myForm.append("title", title);
    myForm.append("blogId", blogId);
    myForm.append("headline", headline);
    myForm.append("summary", summary);
    myForm.append("metaDescription", metaDescription);
    myForm.append("metaKeywords", metaKeywords);
    myForm.append("categoryId", categoryId);
    myForm.append("categoryName", categoryName);
    myForm.append("poster", poster!);
    myForm.append("cover", cover!);

    const response = await axios.put(`/api/admin/blog/${id}`, myForm)
    .then(() => {
      toast.success("Blog updated successfully");
      window.location.href = "/admin/blogs";
    })
    .catch((error) => {
      toast.error("Some error occurred");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const changePosterHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPosterPrev(reader.result ? reader.result.toString() : "");
      setPoster(file);
    }
  }

  const changeCoverHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCover(file);
    }
  }

  return (
    <div className='
      flex flex-row
      justify-around
      min-h-[125vh] sm:min-h-[95vh]
      w-full
    '>
      <div className='
        flex flex-col
        items-center
        h-full
        mx-3 my-10
        w-full md:w-[800px]
      '>
        <h1 className='text-4xl font-extrabold pb-8 text-center'>
          Edit Blog
        </h1>

        <form
          onSubmit={(e: any) => submitHandler(e)}
          className='flex flex-col gap-[12px] w-full'
        >
          <div className='flex flex-row gap-3'>
            <OutlinedInput
              placeholder='Blog Title'
              color='cyan'
              value={title}
              onChange={(value: string) => setTitle(value)}
              required
            />

            <input
              id={"cover-btn"}
              accept="image/png, image/jpg, image/jpeg"
              type={"file"}
              onChange={changeCoverHandler}
              className='hidden'
            />

            <SolidButton
              color='cyan'
              leftIcon={FaPaintRoller}
            >
              <label htmlFor='cover-btn' className='cursor-pointer font-medium'> Cover </label>
            </SolidButton>

            <input
              id={"poster-btn"}
              accept="image/png, image/jpg, image/jpeg"
              type={"file"}
              onChange={changePosterHandler}
              className='hidden'
            />

            <SolidButton
              color='cyan'
              leftIcon={RiImageAddFill}
            >
              <label htmlFor='poster-btn' className='cursor-pointer font-medium'> Poster </label>
            </SolidButton>
          </div>
          
          <OutlinedInput
            placeholder='Please enter a blog headline'
            color='cyan'
            value={headline}
            onChange={(value: string) => setHeadline(value)}
            required
          />

          <OutlinedTextArea
            placeholder='Please enter a blog summary'
            color='cyan'
            value={summary}
            onChange={(value: string) => setSummary(value)}
            required
          />

          <OutlinedTextArea
            placeholder='Please enter a SEO oriented blog desciption'
            color='cyan'
            value={metaDescription}
            onChange={(value: string) => setMetaDescription(value)}
            required
          />

          <div className='flex flex-col md:flex-row gap-3'>
            <OutlinedInput
              placeholder='SEO Keywords (comma separated)'
              color='cyan'
              value={metaKeywords}
              onChange={(value: string) => setMetaKeywords(value)}
              required
            />

            <OutlinedInput
              placeholder='Blog ID'
              color='cyan'
              value={blogId}
              onChange={(value: string) => setBlogId(value)}
              required
            />
          </div>

          <p className='font-semibold text-sm opacity-60'>
            Cover Image: {" "}
            <span className='font-light'> { cover ? cover.name : "Not selected" } </span>
          </p>

          <div className='flex flex-row flex-wrap gap-6 mt-2'>
            <h4 className='text-sm font-semibold'>
              Select a category:
            </h4>
            
            { categories && (
              categories.map((category: Category) => (
                <div className="flex items-center mb-4" key={category.id}>
                  <input
                    id={category.categoryId}
                    type="radio"
                    value={category.categoryId}
                    name="category"
                    className="w-4 h-4 dark:border-gray-300 dark:bg-slate-700"
                    onClick={() => {
                      setCategoryId(category.id);
                      setCategoryName(category.name);
                    }}
                  />

                  <label htmlFor={category.categoryId} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {category.name}
                  </label>
                </div>
              ))
            )}
          </div>

          { posterPrev && (
            <Image
              alt='Poster'
              src={posterPrev}
              width={900}
              height={900}
              className='rounded-lg mt-4'
            />
          )}

          <div className='
            flex flex-col
            items-center
            justify-between
            h-[960px]
            w-full
            mt-10
          '>
            <div className='h-[850px] w-full'>
              <TinyMCE
                apiKey='hjqkalathtise14cv1v91jqibtaolkr9fz1kpsvgsn72s1m4'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={content}
                init={{
                  height: 850,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | fullscreen',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>

            <div className='flex flex-row gap-3 w-full justify-end'>
              <OutlineButton
                color='cyan'
                label='Save Draft'
                leftIcon={RiDraftFill}
              />

              <SolidButton
                submit={true}
                loading={loading}
                color='cyan'
                label='Publish'
                leftIcon={MdPublish}
              />
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default BlogEditor;