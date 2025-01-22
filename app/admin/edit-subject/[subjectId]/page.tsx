import React from "react";
import { Metadata, ResolvingMetadata } from "next";

import AdminNavbar from "@/app/components/layout/AdminNavbar";
import Editor from "./Editor";
import NotFound from "@/app/not-found";

import getSubjectById from "@/app/actions/getSubjectById";
import { getSubjectMeta } from "@/app/actions/meta/getSubjectMeta";

interface IParams {
  subjectId: string;
}

export async function generateMetadata(
  { params }: { params: IParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const subject = await getSubjectMeta(params.subjectId || "");

  if (!subject) {
    return {
      title: `404 Not Found - CollegeNotes`,
      description: "The page you are looking for could not be found.",
    };
  }

  return {
    title: `Edit ${subject.name} - CollegeNotes`,
    description: subject.seoDescription,
    keywords: subject.seoKeywords,
    robots: "index, follow",

    openGraph: {
      title: `Edit ${subject.name} - CollegeNotes`,
      description: subject.seoDescription,
      url: `https://www.collegenotes.co.in/admin/edit-subject/${subject.subjectId}`,
      type: "website",
    },

    twitter: {
      title: `Edit ${subject.name} - CollegeNotes`,
      description: subject.seoDescription,
      card: "summary_large_image",
    },
  };
}

const EditSubject = async ({ params }: { params: IParams }) => {
  const subjectId = params.subjectId;
  const res = await getSubjectById(subjectId || "");

  if (!res) return <NotFound />;

  return (
    <>
      <AdminNavbar />
      <Editor subject={res.subject} />
    </>
  );
};

export default EditSubject;
