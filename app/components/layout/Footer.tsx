"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import { RiLinkedinFill, RiGithubFill, RiInstagramLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const currYear = new Date().getFullYear();

  const adminRoute = pathname!.includes("/admin");

  return (
    <footer
      className={`
        flex flex-col gap-6
        justify-center
        w-full
        ${adminRoute ? "bg-cyan-200/25" : "bg-teal-200/20"}
        py-10
        px-4
        md:px-8
        lg:px-16
        xl:px-32
        2xl:px-80
      `}
    >
      <h2 className="text-3xl font-bold font-roboto_condensed">
        <Link href="/">CollegeNotes</Link>
      </h2>

      <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            Quick Links
          </h3>

          <div className="flex flex-row gap-0 sm:gap-20">
            <div className="flex flex-col items-start gap-1.5 w-1/2 sm:w-[unset]">
              <Link
                href="/contribute"
                className="hover:text-gray-500 text-sm transition-all"
              >
                Contribute
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-500 text-sm transition-all"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="hover:text-gray-500 text-sm transition-all"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex flex-col items-start gap-1.5">
              <Link
                href="/terms-&-conditions"
                className="hover:text-gray-500 text-sm transition-all"
              >
                T&Cs
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-500 text-sm transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/donate"
                className="hover:text-gray-500 text-sm transition-all"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">
            Let's Connect
          </h3>

          <div className="flex flex-row gap-2">
            <SocialLink
              href="https://www.linkedin.com/in/swapnilsachan03/"
              icon={RiLinkedinFill}
            />
            <SocialLink
              href="https://www.github.com/swapnil-sachan/"
              icon={RiGithubFill}
            />
            <SocialLink
              href="https://www.instagram.com/swapnilsachan03/"
              icon={RiInstagramLine}
            />
          </div>
        </div>
      </div>

      <hr className="my-1 border-neutral-300 dark:border-neutral-400" />

      <p className="text-center text-sm">© {currYear} Swapnil Sachan</p>
    </footer>
  );
};

export default Footer;

interface FooterLinkProps {
  href: string;
  icon: IconType;
}

const SocialLink: React.FC<FooterLinkProps> = ({ href, icon: Icon }) => {
  return (
    <Link
      href={href}
      target="blank"
      rel="noreferrer"
      className="
        h-[35px] w-[35px]
        rounded-full
        flex items-center justify-center
        text-neutral-700 dark:text-slate-300
        bg-neutral-300 dark:bg-neutral-800
      "
    >
      <Icon size={22} />
    </Link>
  );
};
