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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="flex-1 bg-[#2a1f36] h-screen">
      <div className="p-5 h-full flex flex-col gap-5">
        {/**Title and Stuff */}
        <div className="flex flex-col">
          <h1 className="text-3xl">Bulletin Board</h1>
          <p className="text-sm">Admin Center</p>
        </div>
        <div className="flex flex-col gap-4">
          {/**Options */}
          <Link
            href={"/"}
            className={`text-center flex items-center gap-1 text-md w-full rounded-md p-2 ${pathname === "/" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
          >
            <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
            Dashboard
          </Link>
          <h2 className="text-sm">Managemnt</h2>
          <div className="flex flex-col gap-2">
            <Link
              href={"/users"}
              className={`text-center rounded-md flex items-center gap-1 text-md w-full p-2 ${pathname === "/users" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
            >
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              Users
            </Link>
            <Link
              href={"/posts"}
              className={`text-center flex items-center gap-1 text-md w-full rounded-md p-2 ${pathname === "/posts" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
            >
              <FontAwesomeIcon icon={faNoteSticky}></FontAwesomeIcon>
              Posts
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
