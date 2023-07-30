'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import Input from '@/app/components/inputs/Input';
import SolidButton from '@/app/components/buttons/SolidButton';

import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const submitHandler = (e: Event) => {
    e.preventDefault();
    setLoading(true);

    signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    .then((res) => {
      if(res?.ok) {
        toast.success('Logged in successfully!');
        setLoading(false);
        router.refresh();
        router.push("/");
      }

      if(res?.error) {
        toast.error(res.error);
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    })
  }

  return (
    <div className='flex flex-col w-full px-4 md:px-0 h-[95vh] items-center justify-center gap-8'>
      <h1 className='text-3xl font-roboto_condensed font-bold'>
        Login
      </h1>

      <form className='flex flex-col gap-7 w-64' onSubmit={() => submitHandler}>
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
          <Link
            href="/auth/forgot-password"
            className='text-[13px] text-neutral-500 dark:text-neutral-200 font-semibold hover:underline'
          >
            Forgot password?
          </Link>

          <SolidButton
            color='teal'
            label='Login'
            loading={loading}
            onClick={(e: any) => submitHandler(e)}
          />

          <p className='text-[13px] font-light'>
            Don't have an account? <Link href="/auth/register" className='text-teal-500 font-medium hover:underline'>Sign up</Link> here
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

export default Login