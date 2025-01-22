import { Metadata, ResolvingMetadata } from "next";

import SubjectViewer from "./Subject";
import NotFound from "@/app/not-found";

import getSubjectById from "@/app/actions/getSubjectById";
import { getSubjectMeta } from "@/app/actions/meta/getSubjectMeta";

interface IParams {
  subjectId?: string;
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
    title: `${subject.name} - Notes, PYQs and more on CollegeNotes`,
    description: subject.seoDescription,
    keywords: subject.seoKeywords,
    robots: "index, follow",

    openGraph: {
      title: `${subject.name} - Notes, PYQs and more on CollegeNotes`,
      description: subject.seoDescription,
      url: `https://www.collegenotes.co.in/subject/${subject.subjectId}`,
      type: "website",
      images: [
        {
          url: subject.poster.url,
          alt: subject.name,
        },
      ],
    },

    twitter: {
      title: `${subject.name} - Notes, PYQs and more on CollegeNotes`,
      description: subject.seoDescription,
      card: "summary_large_image",
    },
  };
}

const Page = async ({ params }: { params: IParams }) => {
  const subjectId = params.subjectId;
  const res = await getSubjectById(subjectId || "");

  if (!res) return <NotFound />;

  const { subject, notes } = res;

  return <SubjectViewer subject={subject} notes={notes} />;
};

export default Page;
