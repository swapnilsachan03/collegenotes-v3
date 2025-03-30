import React from 'react';
import Contact from './Contact';

export const metadata = {
  title: 'Contact Us - CollegeNotes',
  description: "If you have any questions, concerns or issues, we're here to help. Check here to find the answers to your questions and get in touch with us if you need to.",
  keywords: 'collegenotes, contact us, contact collegenotes, collegenoets help, study materials, exam preparation',
  robots: 'index, follow',

  openGraph: {
    title: 'Contact Us - CollegeNotes',
    description: "If you have any questions, concerns or issues, we're here to help. Check here to find the answers to your questions and get in touch with us if you need to.",
    url: 'https://www.collegenotes.co.in/contact',
  },

  twitter: {
    title: 'Contact Us - CollegeNotes',
    description: "If you have any questions, concerns or issues, we're here to help. Check here to find the answers to your questions and get in touch with us if you need to.",
  },
}

const Page = () => {
  return (
    <Contact />
  )
}

export default Page;