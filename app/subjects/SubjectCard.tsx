'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { FiArrowUpRight } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

import SolidButton from '@/app/components/buttons/SolidButton';
import IconButton from '@/app/components/buttons/IconButton';
import { Subject } from '@prisma/client';

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject
}) => {
  const favoriteSubject = async (id: string) => {
    await axios.post(`/api/favorites/${id}`)
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
        flex flex-col gap-2.5
        items-start justify-between
        w-full
        p-3
        bg-gray-50 dark:bg-neutral-900
        border-[1px]
        border-gray-300 dark:border-neutral-700
        rounded-xl
        shadow-md
      '
    >
      <Image
        unoptimized
        alt={`${subject.name} icon`}
        src={subject.icon.url}
        loading="lazy"
        width={85}
        height={85}
        className="rounded-lg w-12 h-12 mb-1"
      />

      <div className='flex flex-col gap-0.5'>
        <h3 className='text-xl font-semibold line-clamp-1'> {subject.name} </h3>
        <p className='text-base'> {subject.views} views </p>
      </div>

      <p className='text-[13px] text-justify line-clamp-4'>
        { subject.description }
      </p>

      <p className='text-xs font-light'> {subject.availableNotes} notes available </p>

      <div
        className='
          w-full
          flex flex-row
          gap-2
          justify-end
        '
      >
        <Link href={`/subject/${subject.subjectId}`}>
          <SolidButton
            color='teal'
            label='Open'
            leftIcon={FiArrowUpRight}
          />
        </Link>

        <IconButton
          color='red'
          icon={FaHeart}
          onClick={() => favoriteSubject(subject.id)}
        />
      </div>
    </div>
  )
}

export default SubjectCard;