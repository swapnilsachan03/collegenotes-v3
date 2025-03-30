'use client';

import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import parse from 'html-react-parser';

import { Notes, Subject } from '@prisma/client';

import styles from "../../styles/Subject.module.css";
import NotesCard from './NotesCard';

interface SubjectProps {
  subject: Subject;
  notes: Notes[];
}

const SubjectViewer: React.FC<SubjectProps> = ({ subject, notes }) => {
  const lastUpdated = new Date(subject.updatedAt).toUTCString().slice(0, -12);

  const bookmarkNotes = async (id: string) => {
    await axios.post(`/api/bookmarks/${id}`)
    .then((res) => {
      toast.success(res.data.message);
    })
    .catch(err => {
      toast.error("Some error occurred");
      console.log(err);
    });
  }  

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
            { subject.degree } - { subject.year } Year
          </h3>

          <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold font-source mt-4'>
            { subject.name }
          </h1>

          <p className='text-[13px] sm:text-sm font-light mt-2'>
            Last updated: { lastUpdated }
          </p>
        </div>

        <Image
          unoptimized
          src={subject.poster.url}
          alt={subject.name}
          width={1500}
          height={1500}
          className='rounded-xl w-full h-auto mb-3'
        />

        <div className={styles.content}> {parse(subject.beforeNotesContent)} </div>

        { notes.length > 0 ? (
          <div className='flex flex-row gap-3 overflow-auto'>
            { notes.map((note) => (
              <NotesCard
                key={note.id}
                notes={note}
                image={subject.icon.url}
                bookmarkNotes={bookmarkNotes}
              />
            ))}
          </div>
        ) : (
          <p className='text-lg font-semibold font-roboto_condensed text-center'>
            No notes found. Be the first to contribute!
          </p>
        )}

        <div className={styles.content}> {parse(subject.afterNotesContent)} </div>
      </div>
    </div>
  )
}

export default SubjectViewer;