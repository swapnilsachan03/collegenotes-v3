'use client';

import Link from 'next/link';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'react-hot-toast';

import Avatar from '@/app/components/Avatar';
import SolidButton from '@/app/components/buttons/SolidButton';
import ProfileNotesCard from './ProfileNotesCard';
import ProfileSubjectCard from './ProfileSubjectCard';
import Input from '@/app/components/inputs/Input';
import { Notes, Subject, User } from '@prisma/client';

import { FaDonate, FaUserEdit, FaUserMinus } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { FiArrowUpRight } from 'react-icons/fi';

interface ProfileViewerProps {
  user: User;
  favorites: Subject[];
  bookmarks: Notes[];
}

const ProfileViewer: React.FC<ProfileViewerProps> = ({
  user, favorites, bookmarks
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const toggleDeleteOpen = () => setEditOpen(!editOpen);

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

  return (
    <div className='
      flex flex-col gap-14
      w-full
      min-h-[95vh]
      px-4
      md:px-8
      lg:px-16
      xl:px-48
      2xl:px-96
      py-14
    '>
      <h1 className='text-5xl text-center font-semibold'>
        Profile
      </h1>

      <div className='flex flex-col sm:flex-row items-center sm:items-start justify-center gap-10'>
        <Avatar
          alt={user?.name!}
          src={user?.avatar ? user.avatar.url! : user?.image!}
          size={52}
        />

        <div className='flex flex-col items-center sm:items-start gap-3'>
          <h2 className='text-4xl font-extralight'>
            {user?.name}
          </h2>

          <p className='text-sm'>
            {user?.email}
          </p>

          <p className='mt-1'>
            <span className='font-semibold'>Member Since: </span>
            {memberSince!.toUTCString().slice(0, -12)}
          </p>

          <div className='flex flex-row gap-2'>
            <SolidButton
              color='teal'
              label='Edit Profile'
              leftIcon={FaUserEdit}
              onClick={toggleDeleteOpen}
            />

            { user?.role === 'admin' ? (
              <Link href={`/admin/dashboard`}>
                <SolidButton
                  color='cyan'
                  label='Dashboard'
                  leftIcon={RiDashboardFill}
                />
              </Link>
            ) : (
              <Link href={`/donate`}>
                <SolidButton
                  color='cyan'
                  label='Support'
                  leftIcon={FaDonate}
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      <hr/>

      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-semibold'>
          Favorite Subjects
        </h2>

        { user && favorites.length > 0 ? (
          <div className='flex flex-row gap-2 overflow-auto'>
            {
              favorites.map((subject: Subject) => {
                return (
                  <ProfileSubjectCard
                    key={subject.id}
                    subject={subject}
                    unfavoriteSubject={unfavoriteSubject}
                  />
                )
              }
            )}
          </div>
        ) : (
          <p className='italic text-secondary mt-2.5'>
            You have not favorited any subjects yet.
          </p>
        )}
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-semibold'>
          Bookmarked Notes
        </h2>

        { user && bookmarks.length > 0 ? (
          <div className='flex flex-row gap-2 overflow-auto'>
            {
              bookmarks.map((notes: Notes) => {
                return (
                  <ProfileNotesCard
                    key={notes.id}
                    notes={notes}
                    unbookmarkNotes={unbookmarkNotes}
                  />
                )
              }
            )}
          </div>
        ) : (
          <p className='italic text-secondary mt-2.5'>
            You have not bookmarked any notes yet.
          </p>
        )}
      </div>

      <EditProfile isOpen={editOpen} toggleOpen={toggleDeleteOpen} user={user} />
    </div>
  )
}

export default ProfileViewer;

interface EditProfileProps {
  user: User;
  isOpen: boolean;
  toggleOpen: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, toggleOpen, user }) => {
  const [name, setName] = useState(user.name);
  const [imagePrev, setImagePrev] = useState(user.avatar?.url);
  const [image, setImage] = useState<File>();

  const changeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result ? (reader.result).toString() : "");
      setImage(file);
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name!);
    formData.append("file", image!);

    await axios.put(`/api/user`, formData)
    .then((res) => {
      toast.success("Profile updated successfully!");
      toggleOpen();
      setTimeout(() => window.location.reload(), 1500);
    })
    .catch(err => {
      toast.error("Some error ocurred");
    });
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          toggleOpen();
          setImagePrev(user.avatar?.url);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-secondary p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className='w-full flex flex-row justify-between items-center'>
                  <p className='font-semibold'> Edit Profile </p>

                  <button
                    className='flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors'
                    onClick={() => {
                      toggleOpen();
                      setImagePrev(user.avatar?.url);
                    }}
                  >
                    <RxCross2 />
                  </button>
                </Dialog.Title>

                <form onSubmit={(e: any) => onSubmit(e)} className='flex flex-col items-center justify-center gap-6 w-full'>
                  <div></div>
                  <Avatar
                    alt="Profile Picture"
                    src={imagePrev!}
                    size={44}
                  />

                  <div className='flex flex-col items-center gap-2'>
                    <input
                      accept='image/*'
                      type='file'
                      id='avatar'
                      className='hidden'
                      onChange={changeImageHandler}
                    />

                    <SolidButton
                      color='teal'
                      leftIcon={FaUserEdit}
                    >
                      <label htmlFor="avatar" className='cursor-pointer'>Change Profile Picture</label>
                    </SolidButton>

                    <p className='text-sm text-neutral-500 dark:text-neutral-400'>Only .jpg, .jpeg, .png files are allowed.</p>
                  </div>

                  <div className='flex flex-col gap-0.5 w-full'>
                    <label className='text-xs font-semibold'>Name</label>
                    <Input
                      type="Name"
                      placeholder="John Doe"
                      value={name!}
                      color='teal'
                      onChange={setName}
                    />

                    <div className='mt-2 w-full'>
                      <Link
                        href="/user/change-password"
                        className='text-left text-[13px] text-neutral-500 dark:text-neutral-200 font-semibold hover:underline'
                      >
                        Change Password <FiArrowUpRight className='inline-block' size={15} />
                      </Link>
                    </div>
                  </div>

                  <div className='w-full flex flex-row justify-end gap-2'>
                    <SolidButton
                      color='red'
                      label='Delete Account'
                      leftIcon={FaUserMinus}
                      onClick={() => {}}
                    />

                    <SolidButton
                      color='teal'
                      label='Update'
                      submit={true}
                      leftIcon={FaUserEdit}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}