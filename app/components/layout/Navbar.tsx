'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";

import styles from "../../styles/Navbar.module.css";
import SolidButton from '../buttons/SolidButton';
import ColorModeSwitcher from './ColorModeSwitcher';

import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser: user
}) => {
  const [navbarDisplay, setNavbarDisplay] = useState("hidden");

  const router = useRouter();
  const pathname = usePathname();

  const adminRoute = pathname!.includes("/admin");
  const blogRoute = pathname!.includes("/blog");

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
    setNavbarDisplay("hidden");
    toast.success("Logged out successfully");
  }

  return (
    <>
      <nav className={`
        flex flex-row
        items-center
        justify-between
        px-4 py-3
        border-b-[1px]
        ${adminRoute ? "dark:border-neutral-800" : "dark:border-neutral-700"}
        border-neutral-300
      `}>
        <h2
          className='font-roboto_condensed text-3xl font-semibold cursor-pointer'
          onClick={() => router.push(blogRoute ? "/blog" : "/")}
        >
          { blogRoute ? "CollegeBlog" : "CollegeNotes" }
        </h2>

        <div className='flex items-center'>
          <div className='hidden flex-row items-center lg:flex'>
            <Link href={"/"} className={styles.navbarLinks}> Home </Link>
            <Link href={"/subjects"} className={styles.navbarLinks}> Subjects </Link>
            <Link href={"/blog"} className={styles.navbarLinks}> Blog</Link>
            <Link href={"/contribute"} className={styles.navbarLinks}> Contribute </Link>
            <Link href={"/about"} className={styles.navbarLinks}> About </Link>
          </div>

          <div className='hidden ml-5 lg:flex gap-2'>
            { user ? (
              <>
                <Link href={"/user/profile"}>
                  <SolidButton
                    label='Profile'
                    color={adminRoute ? "cyan" : "teal"}
                    leftIcon={FaUserCircle}
                  />
                </Link>

                <SolidButton
                  label='Logout'
                  color={adminRoute ? "cyan" : "teal"}
                  leftIcon={MdLogout}
                  onClick={logoutHandler}
                />
              </>
            ) : (
              <>
                <Link href={"/auth/login"}>
                  <SolidButton
                    label='Login'
                    color={adminRoute ? "cyan" : "teal"}
                    leftIcon={MdLogin}
                  />
                </Link>

                <Link href={"/auth/register"}>
                  <SolidButton
                    label='Register'
                    color={adminRoute ? "cyan" : "teal"}
                    leftIcon={FaUserPlus}
                  />
                </Link>
              </>
            )}
          </div>

          <ColorModeSwitcher />

          <button
            className='flex items-center justify-center w-8 h-8 ml-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors lg:hidden'
            onClick={() => setNavbarDisplay("flex")}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}

      <nav className={`${navbarDisplay} fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-inherit z-10`}>
        <button
          className='flex items-center justify-center w-8 h-8 absolute right-4 top-4 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors'
          onClick={() => setNavbarDisplay("hidden")}
        >
          <RxCross1 />
        </button>

        <div className='flex flex-col items-center gap-3'>
          <Link
            href={"/"}
            className={styles.navbarLinks}
            onClick={() => setNavbarDisplay("hidden")}
          >
            Home
          </Link>

          <Link
            href={"/subjects"}
            className={styles.navbarLinks}
            onClick={() => setNavbarDisplay("hidden")}
          >
            Subjects
          </Link>

          <Link
            href={"/blog"}
            className={styles.navbarLinks}
            onClick={() => setNavbarDisplay("hidden")}
          >
            Blog
          </Link>

          <Link
            href={"/contribute"}
            className={styles.navbarLinks}
            onClick={() => setNavbarDisplay("hidden")}
          >
            Contribute
          </Link>

          <Link
            href={"/about"}
            className={styles.navbarLinks}
            onClick={() => setNavbarDisplay("hidden")}
          >
            About
          </Link>
        </div>

        <div className='flex flex-row gap-2 mt-10'>
          { user ? (
            <>
              <Link
                href={"/user/profile"}
                onClick={() => setNavbarDisplay("hidden")}
              >
                <SolidButton
                  label='Profile'
                  color={adminRoute ? 'cyan' : 'teal'}
                  leftIcon={FaUserCircle}
                />
              </Link>

              <SolidButton
                label='Logout'
                color={adminRoute ? 'cyan' : 'teal'}
                leftIcon={MdLogout}
                onClick={logoutHandler}
              />
            </>
          ) : (
            <>
              <Link
                href={"/auth/login"}
                onClick={() => setNavbarDisplay("hidden")}
              >
                <SolidButton
                  color={adminRoute ? 'cyan' : 'teal'}
                  label='Login'
                  leftIcon={MdLogin}
                />
              </Link>

              <Link
                href={"/auth/register"}
                onClick={() => setNavbarDisplay("hidden")}
              >
                <SolidButton
                  color={adminRoute ? 'cyan' : 'teal'}
                  label='Register'
                  leftIcon={FaUserPlus}
                />
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar