import React from "react";
import { redirect } from "next/navigation";

import Login from "./Login";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: "Login - CollegeNotes",
  description:
    "Welcome to CollegeNotes! Gain access to a world of academic excellence by logging in with your account. Unlock subject guides, course materials, study notes, and exclusive CollegeBlog content tailored to your university needs.",
  keywords:
    "collegenotes, collegenotes login, study materials, exam preparation, college subjects",
  robots: "index, follow",

  openGraph: {
    title: "Login - CollegeNotes",
    description:
      "Welcome to CollegeNotes! Gain access to a world of academic excellence by logging in with your account. Unlock subject guides, course materials, study notes, and exclusive CollegeBlog content tailored to your university needs.",
    url: "https://www.collegenotes.co.in/auth/login",
  },

  twitter: {
    title: "Login - CollegeNotes",
    description:
      "Welcome to CollegeNotes! Gain access to a world of academic excellence by logging in with your account. Unlock subject guides, course materials, study notes, and exclusive CollegeBlog content tailored to your university needs.",
  },
};

const LoginWrapper = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/user/profile");
  }

  return <Login />;
};

export default LoginWrapper;
