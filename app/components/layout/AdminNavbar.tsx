"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <div
      className="
      flex flex-row
      gap-2 sm:gap-4 w-full
      overflow-auto
      items-center
      justify-center
      h-12
      bg-neutral-900
    "
    >
      <LinkButton href="dashboard" text="Dashboard" />
      <p className="text-sm text-neutral-400">|</p>

      <LinkButton href="add-subject" text="Add Subject" />
      <p className="text-sm text-neutral-400">|</p>

      <LinkButton href="subjects" text="Subjects" />
      <p className="text-sm text-neutral-400">|</p>

      <LinkButton href="new-blog" text="New Blog" />
      <p className="text-sm text-neutral-400">|</p>

      <LinkButton href="blogs" text="Blogs" />
      <p className="text-sm text-neutral-400">|</p>

      <LinkButton href="users" text="Users" />
    </div>
  );
};

export default AdminNavbar;

interface LinkButtonProps {
  href: string;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, text }) => {
  const path = usePathname();
  const isActive = path === `/admin/${href}`;

  return (
    <Link
      className={`
        font-medium
        text-sm
        hover:underline
        ${isActive ? "text-cyan-400" : "text-white"}
      `}
      href={`/admin/${href}`}
    >
      {text}
    </Link>
  );
};
