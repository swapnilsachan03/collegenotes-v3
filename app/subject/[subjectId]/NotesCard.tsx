import Image from "next/image";
import Link from "next/link";
import React from "react";

import { BsBookmarkFill } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";

import IconButton from "@/app/components/buttons/IconButton";
import SolidButton from "@/app/components/buttons/SolidButton";
import { Notes } from "@prisma/client";

interface NotesCardProps {
  notes: Notes;
  image: string;
  bookmarkNotes: (id: string) => void;
}

const NotesCard: React.FC<NotesCardProps> = ({
  notes,
  image,
  bookmarkNotes,
}) => {
  return (
    <div
      className="
        flex flex-col gap-2.5
        items-start justify-between
        min-w-[280px] w-[280px]
        p-3
        bg-gray-50 dark:bg-neutral-900
        border-[1px]
        border-gray-300 dark:border-neutral-700
        rounded-xl
        shadow-md
      "
    >
      <Image
        unoptimized
        alt={`${notes.title} icon`}
        src={image}
        loading="lazy"
        width={85}
        height={85}
        className="rounded-lg w-12 h-12 mb-1"
      />

      <div className="flex flex-col gap-0.5 align-top">
        <h3 className="text-xl font-semibold line-clamp-1"> {notes.title} </h3>
        <p className="text-base"> {notes.views} views </p>
      </div>

      <p className="text-[13px] text-justify line-clamp-3 min-h-[59px]">
        {" "}
        {notes.description}{" "}
      </p>

      <p className="text-xs font-light text-neutral-600 dark:text-neutral-400">
        {" "}
        {notes.institution}{" "}
      </p>

      <div
        className="
          w-full
          flex flex-row
          gap-2
          justify-end
        "
      >
        <Link href={`/notes/${notes.notesId}`}>
          <SolidButton color="teal" label="Open" leftIcon={FiArrowUpRight} />
        </Link>

        <IconButton
          color="teal"
          icon={BsBookmarkFill}
          onClick={() => bookmarkNotes(notes.id)}
        />
      </div>
    </div>
  );
};

export default NotesCard;
