"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="flex-1 bg-[#2a1f36]">
      <div className="p-5 h-full border border-white flex flex-col gap-5">
        {/**Title and Stuff */}
        <div className="flex flex-col">
          <h1 className="text-3xl">Bulletin Board</h1>
          <p className="text-sm">Admin Center</p>
        </div>
        <div className="flex flex-col gap-4">
          {/**Options */}
          <Link
            href={"/"}
            className={`text-center border w-full rounded-md p-2 ${pathname === "/" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
          >
            Dashboard
          </Link>
          <h2 className="text-sm">Managemnt</h2>
          <div className="flex flex-col gap-2">
            <Link
              href={"/users"}
              className={`text-center rounded-md w-full p-2 ${pathname === "/users" ? "bg-pink-400 text-[#120121]" : "hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "}`}
            >
              Users
            </Link>
            <Link
              href={"/"}
              className="text-center border rounded-md  w-full p-2"
            >
              Posts
            </Link>
          </div>
          <h2 className="text-sm">Systems</h2>
          <div className="flex flex-col gap-2">
            <Link
              href={"/"}
              className="text-center border w-full p-2 rounded-md hover:bg-pink-400 hover:text-[#120121] transition-all duration-200 ease-in-out "
            >
              System Settings
            </Link>
            <Link
              href={"/"}
              className="text-center border w-full p-2 rounded-md"
            >
              Servers
            </Link>
          </div>
        </div>
        <div className="flex mt-auto gap-5">
          <Image
            src={"/pfp.png"}
            alt="default pfp"
            width={50}
            height={50}
          ></Image>
          <div className="flex flex-col">
            <h1 className="text-xl">Jane Doe</h1>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
