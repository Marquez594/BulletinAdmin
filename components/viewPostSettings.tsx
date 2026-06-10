"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEllipsisV,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { PostType, UserType } from "@/types";
import { useRouter } from "next/navigation";

type PostSettingProps = Pick<PostType, "title" | "content">;

type RealProp = {
  post: PostType;
  showDetail?: boolean;
};

export default function PostSetting({ post, showDetail = true }: RealProp) {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [options, setOptions] = useState<string>("none");
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [editForm, setEditForm] = useState<PostSettingProps>({
    title: post.title,
    content: post.content,
  });

  const router = useRouter();

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/edit-post", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: post.postid,
          ...editForm,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
      }
      console.log(data.success);
      setOptions("none");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch("/api/delete-post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postid: post.postid,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      console.log(data.success);
      setOptions("None");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch("/api/fetch-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: post.uid,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        return console.error(data.error);
      }

      setUserDetails(data);
      console.log("User Fetched Correctly");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-fit mx-auto relative flex items-center" ref={dropDownRef}>
      <button
        className="items-center gap-1 hover:cursor-pointer  h-fit"
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
      </button>
      {openDropDown && (
        <div className="h-fit w-24 absolute bg-[#120121] top-9/10 -translate-x-1/2 py-1 flex flex-col px-2 gap-2 rounded-md *:hover:cursor-pointer border border-gray-700 z-10">
          {showDetail && (
            <button
              className="flex items-center gap-1"
              onClick={async () => {
                if (post.uid != null) {
                  await getUser();
                }
                setOptions("detail");
                setOpenDropDown(false);
              }}
            >
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>

              <h1>Details</h1>
            </button>
          )}

          <button
            className="flex items-center gap-1"
            onClick={() => {
              setOptions("edit");
              setOpenDropDown(false);
            }}
          >
            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
            <h1>Edit</h1>
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => {
              setOptions("delete");
              setOpenDropDown(false);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            <h1>Delete</h1>
          </button>
        </div>
      )}
      {options == "detail" && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-20">
          <div className="h-fit w-96 bg-[#2a1f36] rounded-2xl p-4 flex flex-col gap-2">
            <h1 className="flex text-2xl font-bold">Details</h1>
            <div className="flex flex-col items-start gap-1">
              <h1>Title: {post.title}</h1>
              <h1>Text: {post.content}</h1>
              <h1>Posted: {post.created_at}</h1>
              <h1>Username: {userDetails?.username ?? "None"}</h1>
            </div>
            <button
              onClick={() => setOptions("none")}
              className="bg-gray-400 p-2 w-1/2 rounded-2xl self-end hover:cursor-pointer text-[#2a1f36]"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {options == "edit" && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-20">
          <div className="h-fit w-lg bg-[#2a1f36] p-4 rounded-2xl flex flex-col gap-4">
            <h1 className="text-4xl flex">Edit</h1>
            <form className="flex flex-col gap-4" onSubmit={updatePost}>
              <div className="flex flex-col items-start gap-1">
                <label>Title:</label>
                <input
                  value={editForm.title}
                  className="px-2 py-1 bg-[#120121] rounded-md w-full"
                  name="title"
                  onChange={(e) => handleChangeForm(e)}
                ></input>
              </div>
              <div className="flex flex-col items-start gap-1">
                <label>Text:</label>
                <input
                  value={editForm.content}
                  className="px-2 py-1 bg-[#120121] rounded-md w-full"
                  name="content"
                  onChange={(e) => handleChangeForm(e)}
                ></input>
              </div>
              <div className="mt-4 flex gap-4 justify-end *:hover:cursor-pointer">
                <button
                  onClick={() => setOptions("none")}
                  className="bg-gray-400 w-1/4 py-2 rounded-2xl"
                  type="button"
                >
                  Cancel
                </button>
                <button className="bg-red-500 w-1/4 rounded-2xl" type="submit">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {options == "delete" && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-20">
          <div className="h-fit bg-[#2a1f36] rounded-2xl p-4 flex flex-col gap-2">
            <h1 className="text-3xl flex">Delete</h1>
            <p className="text-center">
              Are you sure you want to delete post? All posts that are delete
              are deleted permanently
            </p>
            <div className="flex gap-4 justify-end *:hover:cursor-pointer">
              <button
                className="bg-gray-400 p-2 w-1/4 rounded-2xl"
                onClick={() => setOptions("none")}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 p-2 w-1/4 rounded-2xl"
                onClick={async () => deletePost()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
