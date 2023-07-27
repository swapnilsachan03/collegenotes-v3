'use client';

import axios from 'axios';
import React, { useState } from 'react';
import Image from 'next/image';
import { RiDraftFill, RiImageAddFill } from 'react-icons/ri';
import { MdPublish } from 'react-icons/md';

import OutlinedInput from '@/app/components/inputs/OutlinedInput';
import SolidButton from '@/app/components/buttons/SolidButton';
import OutlinedTextArea from '@/app/components/inputs/OutlinedTextArea';
import OutlineButton from '@/app/components/buttons/OutlineButton';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import type ReactQuill from 'react-quill';
import { HiPlus } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { BsFilePdfFill } from 'react-icons/bs';
import { Subject } from '@prisma/client';

const QuillNoSSRWrapper = dynamic (
  async () => {
    const { default: RQ } = await import('react-quill');

    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  }, { 
    ssr: false,
    loading: () => <p>Loading ...</p>
  }
) as typeof ReactQuill;

interface EditorProps {
  subject: Subject;
}

const Editor: React.FC<EditorProps> = ({ subject }) => {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  const [subjectId, setSubjectId] = useState(subject.subjectId);
  const [subjectName, setSubjectName] = useState(subject.name);
  const [description, setDescription] = useState(subject.description);
  const [seoDescription, setSeoDescription] = useState(subject.seoDescription);
  const [seoKeywords, setSeoKeywords] = useState(subject.seoKeywords);
  const [beforeNotes, setBeforeNotes] = useState(subject.beforeNotesContent);
  const [afterNotes, setAfterNotes] = useState(subject.afterNotesContent);
  const [degree, setDegree] = useState(subject.degree);
  const [year, setYear] = useState(subject.year);
  const [poster, setPoster] = useState<File>();
  const [posterPrev, setPosterPrev] = useState(subject.poster.url);
  const [icon, setIcon] = useState<File>();

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.append("subjectId", subjectId);
    myForm.append("name", subjectName);
    myForm.append("description", description);
    myForm.append("seoDescription", seoDescription);
    myForm.append("seoKeywords", seoKeywords);
    myForm.append("beforeNotesContent", beforeNotes);
    myForm.append("afterNotesContent", afterNotes);
    myForm.append("degree", degree);
    myForm.append("year", year);
    myForm.append("poster", poster!);
    myForm.append("icon", icon!);

    const response = await axios.put(`/api/admin/subject/${subject.subjectId}`, myForm)
    .then(() => {
      toast.success("Subject modified successfully");
      window.location.href = `/admin/subjects`;
    }).catch((err) => {
      toast.error("Some error occurred");
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

  const changeIconHandler = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIcon(file);
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
          Edit Subject
        </h1>

        <form
          onSubmit={(e: any) => submitHandler(e)}
          className='flex flex-col gap-[12px] w-full'
        >
          <div className='flex flex-row gap-3'>
            <OutlinedInput
              placeholder='Subject Name'
              color='cyan'
              value={subjectName}
              onChange={(value: string) => setSubjectName(value)}
              required
            />

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
          
          <OutlinedTextArea
            placeholder='Please enter a subject desciption'
            color='cyan'
            value={description}
            onChange={(value: string) => setDescription(value)}
            required
          />

          <OutlinedTextArea
            placeholder='Please enter a SEO oriented subject desciption'
            color='cyan'
            value={seoDescription}
            onChange={(value: string) => setSeoDescription(value)}
            required
          />

          <div className='flex flex-col md:flex-row gap-3'>
            <OutlinedInput
              placeholder='SEO Keywords (comma separated)'
              color='cyan'
              value={seoKeywords}
              onChange={(value: string) => setSeoKeywords(value)}
              required
            />

            <OutlinedInput
              placeholder='Subject ID'
              color='cyan'
              value={subjectId}
              onChange={(value: string) => setSubjectId(value)}
              required
            />
          </div>

          <div className='flex flex-row gap-3 mt-1'>
            <select
              onChange={(e) => setDegree(e.target.value)}
              className='
              bg-gray-200 dark:bg-neutral-700
                py-[6.5px] px-3
                rounded-md appearance-none
                text-sm font-medium
                focus:outline-none
              '
            >
              <option> Degree </option>
              <option value='BE'> BE </option>
              <option value='ME'> ME </option>
              <option value='MCA'> MCA </option>
              <option value='MBA'> MBA </option>
            </select>

            <select
              onChange={(e) => setYear(e.target.value)}
              className='
              bg-gray-200 dark:bg-neutral-700
                py-[6.5px] px-3
                rounded-md appearance-none
                text-sm font-medium
                focus:outline-none
              '
            >
              <option> Year </option>
              <option value='First'> First </option>
              <option value='Second'> Second </option>
              <option value='Third'> Third </option>
              <option value='Fourth'> Fourth </option>
            </select>

            <input
              id={"icon-btn"}
              accept="image/png, image/jpg, image/jpeg"
              type={"file"}
              onChange={changeIconHandler}
              className='hidden'
            />

            <SolidButton
              color='cyan'
              leftIcon={HiPlus}
            >
              <label htmlFor='icon-btn' className='cursor-pointer font-medium'> Icon </label>
            </SolidButton>

            <Link href={`/admin/notes/${subject.subjectId}`}>
              <SolidButton
                color='cyan'
                label='Notes'
                leftIcon={BsFilePdfFill}
              />
            </Link>
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
            h-[1150px] md:h-[1100px]
            w-full
            mt-10
          '>
            <div className='h-[450px] w-full'>
              <QuillNoSSRWrapper
                placeholder='Enter content to show before notes'
                modules={modules}
                value={beforeNotes}
                onChange={setBeforeNotes}
                theme='snow'
                style={{width: "100%", height: "100%"}}
              />
            </div>

            <div className='h-[450px] w-full'>
              <QuillNoSSRWrapper
                placeholder='Enter content to show after notes'
                modules={modules}
                value={afterNotes}
                onChange={setAfterNotes}
                theme='snow'
                style={{width: "100%", height: "100%"}}
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

export default Editor;