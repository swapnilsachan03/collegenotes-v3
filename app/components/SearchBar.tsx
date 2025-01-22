"use client";

import React, { Fragment, useCallback, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const degrees = ["BE", "ME", "BCA", "MCA"];
const years = ["First", "Second", "Third", "Fourth"];

const SearchBar = () => {
  const [keywords, setKeywords] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      keywords,
      degree,
      year,
    };

    const url = qs.stringifyUrl(
      {
        url: "/subjects",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [keywords, degree, year, router, params]);

  return (
    <div className="flex flex-row gap-4 items-end">
      <div className="relative w-full">
        <input
          placeholder="Search all subjects"
          type="text"
          value={keywords}
          onChange={e => setKeywords(e.target.value)}
          className="
            relative
            w-full
            px-1 py-2
            bg-transparent
            border-b-2
            border-b-gray-400
            focus:border-b-2
            focus:border-b-teal-500
            transition ease-linear duration-200
            focus:outline-none
          "
        />

        <button
          className="
            flex items-center justify-center
            w-9 h-8
            absolute top-1 right-0
            rounded-md
            text-teal-500
            hover:bg-teal-500/10
            transition-colors
          "
          onClick={onSubmit}
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="
              flex
              gap-2
              items-center
              justify-center
              px-3 py-2
              font-medium
              bg-transparent
              border-b-2
              border-b-gray-400
              focus:border-b-teal-500
              transition ease-linear duration-200
            "
            >
              {degree === "" ? "Degree" : degree}
              <FaChevronDown size={13} />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <ul className="py-1">
                {degrees.map(degree => (
                  <Menu.Item key={degree}>
                    <li
                      className={`block px-4 py-2 text-sm cursor-pointer hover:bg-neutral-600 dark:hover:bg-neutral-800 hover:text-neutral-100`}
                      onClick={() => setDegree(degree)}
                    >
                      {degree}
                    </li>
                  </Menu.Item>
                ))}
              </ul>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="
              flex
              gap-2
              items-center
              justify-center
              px-3 py-2
              font-medium
              bg-transparent
              border-b-2
              border-b-gray-400
              focus:border-b-teal-500
              transition ease-linear duration-200
            "
            >
              {year === "" ? "Year" : year}
              <FaChevronDown size={13} />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white dark:bg-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {years.map(year => (
                  <Menu.Item key={year}>
                    <li
                      key={year}
                      className={`block px-4 py-2 text-sm cursor-pointer hover:bg-neutral-600 dark:hover:bg-neutral-800 hover:text-neutral-100`}
                      onClick={() => setYear(year)}
                    >
                      {year}
                    </li>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default SearchBar;
