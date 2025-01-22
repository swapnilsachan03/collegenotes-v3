"use client";

import OutlineButton from "@/app/components/buttons/OutlineButton";
import SolidButton from "@/app/components/buttons/SolidButton";
import OutlinedInput from "@/app/components/inputs/OutlinedInput";
import OutlinedTextArea from "@/app/components/inputs/OutlinedTextArea";
import { Notes, Subject } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaDownload, FaUpload } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBin3Fill } from "react-icons/ri";

interface NotesManagerProps {
  subject: Subject;
  notes: Notes[];
}

const NotesManager: React.FC<NotesManagerProps> = ({ subject, notes }) => {
  const [title, setTitle] = useState("");
  const [notesID, setNotesID] = useState("");
  const [description, setDescription] = useState<string | null>();
  const [contributor, setContributor] = useState<string | null>();
  const [contributorLink, setContributorLink] = useState<string | null>();
  const [institution, setInstitution] = useState("");
  const [document, setDocument] = useState<File>();

  const changeDocumentHandler = (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDocument(file);
    };
  };

  const submitHandler = async (event: any) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.append("notesId", notesID);
    myForm.append("title", title);
    if (description) myForm.append("description", description);
    if (contributor) myForm.append("contributor", contributor);
    if (contributorLink) myForm.append("contributorSocial", contributorLink);
    myForm.append("institution", institution);
    myForm.append("document", document!);

    const res = await axios
      .post(`/api/admin/subject/${subject.subjectId}`, myForm)
      .then(res => {
        toast.success(res.data.message);
      })
      .catch(err => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setTitle("");
        setNotesID("");
        setDescription(null);
        setContributor(null);
        setContributorLink(null);
        setInstitution("");
        setDocument(undefined);
        console.log(subject.subjectId);
      });
  };

  const deleteNotesHandler = async (notesID: string, subjectID: string) => {
    console.log(notesID, subjectID);
  };

  return (
    <div
      className="
    flex flex-row
    justify-around
    min-h-[95vh]
    w-full
  "
    >
      <div
        className="
      flex flex-col
      items-center
      h-full
      mx-3 my-10
      w-full md:w-[1100px]
    "
      >
        <h1 className="text-4xl font-extrabold pb-1 text-center">
          Notes Manager
        </h1>

        <h3 className="text-md font-medium pb-8 text-center opacity-60">
          {subject.name}
        </h3>

        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-4 w-full">
          <div className="w-full md:w-[60%]">
            <h2 className="text-2xl font-bold mb-4">Notes</h2>

            {notes.length > 0 ? (
              <div className="flex flex-col gap-2">
                {notes.map((notes, index) => (
                  <AdminNotesCard
                    key={notes.id}
                    index={index}
                    notes={notes}
                    subjectId={subject.subjectId}
                    deleteNotesHandler={deleteNotesHandler}
                  />
                ))}
              </div>
            ) : (
              <p> No notes uploaded till now! </p>
            )}
          </div>

          <div className="w-full md:w-[40%]">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Notes</h2>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e: any) => submitHandler(e)}
            >
              <OutlinedInput
                placeholder="Enter notes title"
                color="cyan"
                value={title}
                onChange={(value: string) => setTitle(value)}
              />

              <OutlinedInput
                placeholder="Enter notes ID"
                color="cyan"
                value={notesID}
                onChange={(value: string) => setNotesID(value)}
              />

              <OutlinedTextArea
                placeholder="Notes description (optional)"
                color="cyan"
                value={description ? description : ""}
                onChange={(value: string) => setDescription(value)}
              />

              <OutlinedInput
                placeholder="Enter contributor's name (optional)"
                color="cyan"
                value={contributor ? contributor : ""}
                onChange={(value: string) => setContributor(value)}
              />

              <OutlinedInput
                placeholder="Enter contributor's social handle (optional)"
                color="cyan"
                value={contributorLink ? contributorLink : ""}
                onChange={(value: string) => setContributorLink(value)}
              />

              <OutlinedInput
                placeholder="Enter institution name"
                color="cyan"
                value={institution}
                onChange={(value: string) => setInstitution(value)}
              />

              {document && (
                <p className="font-semibold text-sm opacity-60">
                  Document:{" "}
                  <span className="font-light"> {document.name} </span>
                </p>
              )}

              <div className="flex flex-row gap-3 w-full justify-end mt-2">
                <input
                  id="notes-pdf"
                  accept="application/pdf"
                  required
                  type="file"
                  onChange={changeDocumentHandler}
                  className="hidden"
                />

                <OutlineButton color="cyan" leftIcon={HiPlus}>
                  <label
                    htmlFor="notes-pdf"
                    className="cursor-pointer font-medium"
                  >
                    {" "}
                    Add Notes{" "}
                  </label>
                </OutlineButton>

                <SolidButton
                  submit={true}
                  color="cyan"
                  label="Upload"
                  leftIcon={FaUpload}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesManager;

interface AdminNotesCardProps {
  index: number;
  notes: Notes;
  subjectId: string;
  deleteNotesHandler: (notesID: string, subjectID: string) => void;
}

const AdminNotesCard: React.FC<AdminNotesCardProps> = ({
  index,
  notes,
  subjectId,
  deleteNotesHandler,
}) => {
  return (
    <div
      className="
      flex flex-col lg:flex-row
      gap-3 md:gap-0
      items-start justify-between
      w-full
      p-4
      bg-gray-50 dark:bg-neutral-900
      border-[1px]
      border-gray-300 dark:border-neutral-700
      rounded-xl
      shadow-lg
    "
    >
      <div className="flex flex-row items-start gap-2.5">
        <h3 className="text-xl font-semibold"> {index + 1}. </h3>

        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">
            {notes.title} <span className="font-normal">by</span>{" "}
            {notes.contributor}
          </h3>

          <p className="text-sm font-light">
            {notes.notesId} | {notes.views} views
          </p>

          <p className="text-base"> {notes.description} </p>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-2.5 w-full lg:w-12">
        <Link href={`/notes/${notes.notesId}`}>
          <OutlineButton color="cyan" label="View" rightIcon={FiArrowUpRight} />
        </Link>

        <Link href={notes.document.url} target="_blank">
          <SolidButton color="cyan" leftIcon={FaDownload} />
        </Link>

        <SolidButton
          color="red"
          leftIcon={RiDeleteBin3Fill}
          onClick={() => deleteNotesHandler(notes.notesId, subjectId)}
        />
      </div>
    </div>
  );
};
