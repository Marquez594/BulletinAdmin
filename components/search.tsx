"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "next/navigation";

type SearchProp = {
  option?: "both" | "user" | "post";
};

export default function Search({ option = "both" }: SearchProp) {
  const params = useSearchParams();
  const q = params.get("q") ?? ""

  return (
    <form
      className="ml-auto bg-[#2a1f36] pl-4  w-2/5 p-1 flex items-center gap-2 rounded-2xl border border-pink-400"
      action={"/search"}
    >
      <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      <input
        type="hidden"
        name="users"
        value={option == "user" || option == "both" ? "true" : "false"}
      ></input>
      <input
        type="hidden"
        name="posts"
        value={option == "post" || option == "both" ? "true" : "false"}
      ></input>
      <input
        name="q"
        defaultValue={q ?? ""}
        required
        className="flex-1 focus:outline-none focus-visible:border-pink-400 focus-visible:ring-2 focus-visible:ring-pink-400"
        placeholder={
          option == "both"
            ? "Search Users and Post"
            : option == "post"
              ? "Search Post"
              : option == "user"
                ? "Search User"
                : "Error"
        }
      ></input>

      <button
        type="submit"
        className="bg-pink-400 text-[#2a1f36] p-1 px-3 rounded-xl hover:cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
}
