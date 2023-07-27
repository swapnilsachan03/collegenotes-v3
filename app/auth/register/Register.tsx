'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import Input from '@/app/components/inputs/Input';
import SolidButton from '@/app/components/buttons/SolidButton';
import Avatar from '@/app/components/Avatar';

const Register = () => {
  const [name, setName] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState<File>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", image!);

    await axios.post(`/api/register`, formData)
    .then((res) => {
      toast.success("Registered successfully!");
      router.push("/auth/login");
    })
    .catch(err => {
      toast.error(err);
    });
  }

  return (
    <div className='flex flex-col w-full px-4 md:px-0 h-[95vh] items-center justify-center gap-8'>
      <Avatar
        alt="Profile Picture"
        src={imagePrev}
        size={32}
      />

      <form className='flex flex-col gap-7 w-64' onSubmit={() => submitHandler}>
        <input
          required
          accept='image/*'
          type='file'
          id='avatar'
          className='hidden'
          onChange={changeImageHandler}
        />

        <div className='flex flex-col gap-0.5'>
          <label className='text-xs font-semibold'>Name</label>
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            required={true}
            color='teal'
            onChange={setName}
          />
        </div>

        <div className='flex flex-col gap-0.5'>
          <label className='text-xs font-semibold'>Email</label>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            required={true}
            color='teal'
            onChange={setEmail}
          />
        </div>

        <div className='flex flex-col gap-0.5'>
          <label className='text-xs font-semibold'>Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            required={true}
            color='teal'
            onChange={setPassword}
          />
        </div>

        <div className='flex flex-col gap-5 items-start'>
          <label
            htmlFor='avatar'
            className='text-[13px] text-neutral-500 dark:text-neutral-200 font-semibold cursor-pointer hover:underline'
          >
            Choose Avatar
          </label>

          <SolidButton
            color='teal'
            label='Register'
            onClick={(e: any) => submitHandler(e)}
          />

          <p className='text-[13px] font-light'>
            Already a member? <Link href="/auth/login" className='text-teal-500 font-medium hover:underline'>Log in</Link> here
          </p>
        </div>
      </form>

      <div className='flex flex-col gap-2.5 items-center'>
        <p className='text-[13px] opacity-90 dark:opacity-80 font-light'> or, continue with: </p>

        <div className='flex flex-row items-center gap-2'>
          <button
            onClick={() => signIn('google')}
            className='
              flex flex-row
              items-center justify-center
              gap-2
              w-full h-[38px]
              px-2.5
              rounded-lg
              border-[1px] border-neutral-400 dark:border-neutral-600
              hover:bg-neutral-400/10
              transition-colors
            '
          >
            <FcGoogle size={25} />
            <p className='font-semibold text-sm' >Google</p>
          </button>

          <button
            onClick={() => signIn('github')}
            className='
              flex flex-row
              items-center justify-center
              gap-2
              w-full h-[38px]
              px-2.5
              rounded-lg
              bg-black text-white
              transition-colors
            '
          >
            <AiFillGithub size={25} />
            <p className='font-semibold text-sm' >GitHub</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register;