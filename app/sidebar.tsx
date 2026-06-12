"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  faHouse,
  faUser,
  faNoteSticky,
  faWrench,
  faServer,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function SideBar() {
  const pathname = usePathname();
  const [sideBar, setSideBar] = useState<boolean>(false);

  return (
    <aside
      className={`w-fit bg-[#2a1f36]  h-screen ${sideBar ? "min-w-screen md:min-w-1/10" : null}`}
    >
      <div className="p-2 md:p-5 h-full flex flex-col gap-5 w-full">
        {/**Title and Stuff */}
        <div className="flex items-center justify-center md:gap-5">
          {sideBar ? (
            <div>
              <h1 className="md:text-2xl text-xl">Bulletin Board</h1>
              <p className="text-sm">Admin Center</p>
            </div>
          ) : null}
          <button
            className={` hover:cursor-pointer ${sideBar ? "ml-auto" : null}`}
            onClick={() => setSideBar((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
          </button>
        </div>
        <div
          className={`flex flex-col gap-2 ${sideBar ? "items-start w-full" : "items-center"}`}
        >
          {/**Options */}
          <Link
            href={"/"}
            className={`text-center  items-center gap-1 text-md w-full rounded-md p-2 ${pathname === "/" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
          >
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            {sideBar ? "Dashboard" : null}
          </Link>
          <div className="flex flex-col gap-2 w-full">
            <Link
              href={"/users"}
              className={`text-center justify-center rounded-md flex items-center gap-1 text-md w-full p-2 ${pathname === "/users" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
            >
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              {sideBar ? "Users" : null}
            </Link>
            <Link
              href={"/posts"}
              className={`text-center justify-center flex items-center gap-1 text-md w-full rounded-md p-2 ${pathname === "/posts" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
            >
              <FontAwesomeIcon icon={faNoteSticky}></FontAwesomeIcon>
              {sideBar ? "Posts" : null}
            </Link>
          </div>
        </div>
        <div className="flex mt-auto gap-5 justify-center">
          <Image
            src={"/pfp.png"}
            alt="default pfp"
            width={50}
            height={50}
          ></Image>
          {sideBar ? (
            <div className="flex flex-col">
              <h1 className="text-xl">Jane Doe</h1>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
