import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUpRight } from 'react-icons/fi';
import { RiDeleteBin3Fill } from 'react-icons/ri';

import SolidButton from '@/app/components/buttons/SolidButton';
import IconButton from '@/app/components/buttons/IconButton';
import { Subject } from '@prisma/client';

interface ProfileSubjectCardProps {
  subject: Subject;
  unfavoriteSubject: (id: string) => void;
}

const ProfileSubjectCard: React.FC<ProfileSubjectCardProps> = ({
  subject, unfavoriteSubject
}) => {
  return (
    <div
      className='
        flex flex-col gap-2.5
        items-start justify-between
        min-w-[280px] w-[280px]
        p-3
        bg-gray-50 dark:bg-neutral-900
        border-[1px]
        border-gray-300 dark:border-neutral-700
        rounded-xl
        shadow-md
        transition-all duration-200
      '
    >
      <Image
        alt={`${subject.name} icon`}
        src="/images/favorite.png"
        loading="lazy"
        width={85}
        height={85}
        className="rounded-lg w-12 h-12 p-2 mb-1 bg-sky-700"
      />

      <div className='flex flex-col gap-0.5'>
        <h3 className='text-xl font-semibold line-clamp-1'> {subject.name} </h3>
        <p className='text-base'> {subject.views} views </p>
      </div>

      <p className='text-[13px] text-justify line-clamp-3'> {subject.description} </p>
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
          icon={RiDeleteBin3Fill}
          onClick={() => unfavoriteSubject(subject.id)}
        />
      </div>
    </div>
  )
}

export default ProfileSubjectCard;