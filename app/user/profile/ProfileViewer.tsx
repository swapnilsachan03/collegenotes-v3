"use client";

import Link from "next/link";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import Avatar from "@/app/components/Avatar";
import SolidButton from "@/app/components/buttons/SolidButton";
import ProfileNotesCard from "./ProfileNotesCard";
import ProfileSubjectCard from "./ProfileSubjectCard";
import Input from "@/app/components/inputs/Input";
import { Blog, Notes, Subject, User } from "@prisma/client";

import { FaDonate, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { RiDashboardFill, RiDeleteBin3Fill } from "react-icons/ri";
import { FiArrowUpRight } from "react-icons/fi";
import Modal from "@/app/components/Modal";
import OutlineButton from "@/app/components/buttons/OutlineButton";

interface ProfileViewerProps {
  user: User & { blogs: Blog[] };
  favorites: Subject[];
  bookmarks: Notes[];
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
  user,
  favorites,
  bookmarks,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const toggleEditOpen = () => setEditOpen(!editOpen);

  const memberSince = new Date(user.createdAt);

  const unfavoriteSubject = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/favorites/${id}`, {
        headers: {},
        withCredentials: true,
      });

      toast.success(data.message);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      toast.error("Some error occurred");
    }
  };

  const unbookmarkNotes = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/bookmarks/${id}`, {
        headers: {},
        withCredentials: true,
      });

      toast.success(data.message);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      toast.error("Some error occurred");
    }
  };

  const deleteBlog = async (blogId: string) => {
    await axios
      .delete(`/api/admin/blog/${blogId}`)
      .then(() => {
        toast.success("Blog deleted successfully!");
        window.location.reload();
      })
      .catch(err => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      className="
      flex flex-col gap-14
      w-full
      min-h-[95vh]
      px-4
      md:px-8
      lg:px-16
      xl:px-48
      2xl:px-96
      py-14
    "
    >
      <h1 className="text-5xl text-center font-semibold">Profile</h1>

      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-10">
        <Avatar
          alt={user?.name!}
          src={user?.avatar ? user.avatar.url! : user?.image!}
          size={52}
        />

        <div className="flex flex-col items-center sm:items-start gap-3">
          <h2 className="text-4xl font-extralight">{user?.name}</h2>

          <p className="text-sm">{user?.email}</p>

          <p className="mt-1">
            <span className="font-semibold">Member Since: </span>
            {memberSince!.toUTCString().slice(0, -12)}
          </p>

          <div className="flex flex-row gap-2">
            <SolidButton
              color="teal"
              label="Edit Profile"
              leftIcon={FaUserEdit}
              onClick={toggleEditOpen}
            />

            {user?.role === "admin" ? (
              <Link href={`/admin/dashboard`}>
                <SolidButton
                  color="cyan"
                  label="Dashboard"
                  leftIcon={RiDashboardFill}
                />
              </Link>
            ) : (
              <Link href={`/donate`}>
                <SolidButton color="cyan" label="Support" leftIcon={FaDonate} />
              </Link>
            )}
          </div>

          {(user.role == "blogger" || user.role == "moderator") && (
            <h3 className="text-sm text-center mt-4">
              Want to write a new blog?{" "}
              <Link href="/new-blog" className="text-teal-500 hover:underline">
                Start here!
              </Link>
            </h3>
          )}
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Favorite Subjects</h2>

        {user && favorites.length > 0 ? (
          <div className="flex flex-row gap-2 overflow-auto">
            {favorites.map((subject: Subject) => {
              return (
                <ProfileSubjectCard
                  key={subject.id}
                  subject={subject}
                  unfavoriteSubject={unfavoriteSubject}
                />
              );
            })}
          </div>
        ) : (
          <p className="italic text-secondary mt-2.5">
            You have not favorited any subjects yet.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Bookmarked Notes</h2>

        {user && bookmarks.length > 0 ? (
          <div className="flex flex-row gap-2 overflow-auto">
            {bookmarks.map((notes: Notes) => {
              return (
                <ProfileNotesCard
                  key={notes.id}
                  notes={notes}
                  unbookmarkNotes={unbookmarkNotes}
                />
              );
            })}
          </div>
        ) : (
          <p className="italic text-secondary mt-2.5">
            You have not bookmarked any notes yet.
          </p>
        )}
      </div>

      {(user.role == "admin" ||
        user.role == "moderator" ||
        user.role == "blogger") && (
        <>
          <hr />

          <h2 className="text-4xl text-center font-bold mb-0">Your Blogs</h2>

          <div className="w-full overflow-auto">
            {user.blogs.length > 0 ? (
              <table className="w-[1200px] 2xl:w-full">
                <caption className="caption-bottom mt-5 text-[15px] font-medium text-neutral-600 dark:text-neutral-300">
                  All your blogs on CollegeNotes
                </caption>

                <thead className="text-left">
                  <tr className="border-b-[1px] border-gray-100 dark:border-neutral-700">
                    <th className="py-4">Blog ID</th>
                    <th className="py-4">Blog Title</th>
                    <th className="py-4">Category</th>
                    <th className="py-4 text-right">Published</th>
                    <th className="py-4 text-right">Views</th>
                    <th className="py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {user.blogs.map((blog: Blog) => (
                    <tr
                      key={blog.id}
                      className="border-b-[1px] border-gray-100 dark:border-neutral-700"
                    >
                      <td className="py-4">{blog.blogId}</td>
                      <td className="py-4">{blog.title}</td>
                      <td className="py-4">{blog.categoryName}</td>
                      <td className="py-4 text-right">
                        {" "}
                        {blog.published == true ? "Yes" : "No"}{" "}
                      </td>
                      <td className="py-4 text-right"> {blog.views} </td>

                      <td className="py-4 flex flex-row gap-3 justify-end">
                        <Link
                          href={`/edit-blog/${blog.blogId}`}
                          target="_blank"
                        >
                          <OutlineButton
                            color="cyan"
                            label="Edit"
                            rightIcon={FiArrowUpRight}
                          />
                        </Link>

                        <SolidButton
                          color="red"
                          rightIcon={RiDeleteBin3Fill}
                          onClick={() => deleteBlog(blog.blogId)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="italic text-secondary mt-2.5">
                You have not written any blogs yet.
              </p>
            )}
          </div>
        </>
      )}

      <EditProfile isOpen={editOpen} toggleOpen={toggleEditOpen} user={user} />
    </div>
  );
};

export default ProfileViewer;

interface EditProfileProps {
  user: User;
  isOpen: boolean;
  toggleOpen: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  toggleOpen,
  user,
}) => {
  const [name, setName] = useState(user.name);
  const [imagePrev, setImagePrev] = useState(user.avatar?.url);
  const [image, setImage] = useState<File>();

  const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result ? reader.result.toString() : "");
      setImage(file);
    };
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name!);
    formData.append("file", image!);

    await axios
      .put(`/api/user`, formData)
      .then(res => {
        toast.success("Profile updated successfully!");
        toggleOpen();
        setTimeout(() => window.location.reload(), 1500);
      })
      .catch(err => {
        toast.error("Some error ocurred");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        toggleOpen();
        setImagePrev(user.avatar?.url);
      }}
      modalHeader="Edit Profile"
    >
      <form
        onSubmit={(e: any) => onSubmit(e)}
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        <div></div>
        <Avatar alt="Profile Picture" src={imagePrev!} size={44} />

        <div className="flex flex-col items-center gap-2">
          <input
            accept="image/*"
            type="file"
            id="avatar"
            className="hidden"
            onChange={changeImageHandler}
          />

          <SolidButton color="teal" leftIcon={FaUserEdit}>
            <label htmlFor="avatar" className="cursor-pointer">
              Change Profile Picture
            </label>
          </SolidButton>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Only .jpg, .jpeg, .png files are allowed.
          </p>
        </div>

        <div className="flex flex-col gap-0.5 w-full">
          <label className="text-xs font-semibold">Name</label>
          <Input
            type="Name"
            placeholder="John Doe"
            value={name!}
            color="teal"
            onChange={setName}
          />

          <div className="mt-2 w-full">
            <Link
              href="/user/change-password"
              className="text-left text-[13px] text-neutral-500 dark:text-neutral-200 font-semibold hover:underline"
            >
              Change Password{" "}
              <FiArrowUpRight className="inline-block" size={15} />
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-row justify-end gap-2">
          <SolidButton
            color="red"
            label="Delete Account"
            leftIcon={FaUserMinus}
            onClick={() => {}}
          />

          <SolidButton
            color="teal"
            label="Update"
            submit={true}
            leftIcon={FaUserEdit}
          />
        </div>
      </form>
    </Modal>
  );
};
