"use client";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PostFilters() {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [option, setOption] = useState<number>(1);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  function changeSort() {
    const params = new URLSearchParams(searchParams);
    let sortTerm: string = "";
    if (option == 1) {
      sortTerm = "createdLatest";
    } else if (option == 2) {
      sortTerm = "createdOldest";
    } else if (option == 3) {
      sortTerm = "TitleAZ";
    } else if (option == 4) {
      sortTerm = "TitleZA";
    }
    params.set("sort", sortTerm);
    router.push(`/posts?${params.toString()}`);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="bg-[#2a1f36] w-fit  rounded-md flex items-center gap-2 relative"
      ref={dropDownRef}
    >
      <button
        className={`flex items-center gap-2  w-full px-4 py-2 hover:cursor-pointer rounded-md `}
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <h1>Sort by</h1>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`${openDropDown ? "rotate-180" : ""} `}
        ></FontAwesomeIcon>
      </button>
      {openDropDown && (
        <div className="top-14 w-48 h-fit bg-[#2a1f36] border border-gray-500 absolute rounded-xl flex flex-col justify-center items-start py-2 *:hover:cursor-pointer">
          <button
            className={`px-2 py-1 w-full ${option == 1 ? "bg-pink-500" : ""}`}
            onClick={() => setOption(1)}
          >
            Date Created Lastest
          </button>
          <button
            className={`px-2 py-1 w-full ${option == 2 ? "bg-pink-500" : ""}`}
            onClick={() => setOption(2)}
          >
            Date Created Oldest
          </button>
          <button
            className={`px-2 py-1 w-full ${option == 3 ? "bg-pink-500" : ""}`}
            onClick={() => setOption(3)}
          >
            Title A-Z
          </button>
          <button
            className={`px-2 py-1 w-full ${option == 4 ? "bg-pink-500" : ""}`}
            onClick={() => setOption(4)}
          >
            Title Z-A
          </button>
          <button
            className="w-1/4 self-end text-center bg-pink-500 mr-4 mt-2  rounded-md p-1"
            onClick={() => changeSort()}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
