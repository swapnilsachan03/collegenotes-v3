import React from "react";
import AddSubject from "./AddSubject";

export const metadata = {
  title: "Add Subject - CollegeNotes",
  description:
    "Add a subject to the CollegeNotes platform. Once you add a subject, you can edit it and add notes.",
  keywords:
    "collegenotes, collegenotes add subject, add subject to collegenotes, add subject",

  openGraph: {
    title: "Add Subject - CollegeNotes",
    description:
      "Add a subject to the CollegeNotes platform. Once you add a subject, you can edit it and add notes.",
    url: "https://www.collegenotes.co.in/admin/add-subject",
  },

  twitter: {
    title: "Add Subject - CollegeNotes",
    description:
      "Add a subject to the CollegeNotes platform. Once you add a subject, you can edit it and add notes.",
  },
};

const Page = () => {
  return <AddSubject />;
};

export default Page;
