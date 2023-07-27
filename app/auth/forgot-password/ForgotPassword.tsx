'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/app/components/inputs/Input';
import SolidButton from '@/app/components/buttons/SolidButton';

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const submitHandler = (e: Event) => {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div className='flex flex-col w-full px-4 md:px-0 h-[95vh] items-center justify-center gap-10'>
      <h1 className='text-2xl lg:text-3xl font-roboto_condensed font-bold'>
        Account Recovery
      </h1>

      <form className='flex flex-col gap-7 w-64 lg:w-72' onSubmit={() => submitHandler}>
        <div className='flex flex-col gap-0.5'>
          <label className='text-xs font-semibold'>Email address</label>
          <Input
            type="email"
            placeholder="johndoe@gmail.com "
            value={email}
            required={true}
            color='teal'
            onChange={setEmail}
          />
        </div>

        <SolidButton
          color='teal'
          label='Send Reset Link'
          onClick={(e: any) => submitHandler(e)}
        />
      </form>
    </div>
  )
}

export default ChangePassword