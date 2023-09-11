'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MdSend } from 'react-icons/md';

import Input from '../components/inputs/Input';
import FlushedTextarea from '../components/inputs/FlushedTextarea';
import SolidButton from '../components/buttons/SolidButton';

const submitHandler = (e: any) => {
  e.preventDefault();
  console.log('submitted');
}

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className='flex flex-col w-full px-4 md:px-0 h-[95vh] items-center justify-center gap-10'>
      <h1 className='text-3xl font-roboto_condensed font-bold'>
        Contact Us
      </h1>

      <p className='text-sm text-center text-neutral-500 dark:text-neutral-400 w-80'>
        You can get in touch with us using this form. We will try our best to respond in 24 hours.
      </p>

      <form className='flex flex-col gap-7 w-80' onSubmit={() => submitHandler}>
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
          <label className='text-xs font-semibold'>Message</label>
          <FlushedTextarea
            placeholder="Type in your message"
            value={message}
            required={true}
            color='teal'
            onChange={setMessage}
          />
        </div>

        <div className='flex flex-col gap-8 items-start'>
          <SolidButton
            color='teal'
            label='Send'
            rightIcon={MdSend}
            onClick={(e: any) => submitHandler(e)}
          />

          <p className='text-[13px] font-light'>
            Want a new subject? <Link href="/request" className='text-teal-500 font-medium hover:underline'>Request</Link> here
          </p>
        </div>
      </form>
    </div>
  )
}

export default Contact;