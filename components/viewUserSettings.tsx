"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  faEllipsisV,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { UserType } from "@/types";
import { useRouter } from "next/navigation";
type UserSettingProps = Pick<
  UserType,
  "uid" | "firstname" | "lastname" | "username"
>;

export default function UserSetting({
  uid,
  firstname,
  lastname,
  username,
}: UserSettingProps) {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({
    firstname,
    lastname,
    username,
  });
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleDelete() {
    try {
      const res = await fetch("/api/delete-user", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: uid }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      console.log("User Deleted", data);
      setOpenConfirmDelete(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const res = await fetch("/api/edit-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: uid,
          ...editForm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
        return;
      }

      console.log("User edit approved");
      setOpenEdit(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

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
    <div className="relative  w-fit " ref={dropDownRef}>
      <button
        className="hover:cursor-pointer"
        onClick={() => setOpenDropDown(!openDropDown)}
      >
        <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
      </button>
      {openDropDown && (
        <div className="h-20 w-24 absolute bg-[#120121] top-full -translate-x-1/2 py-1 flex flex-col px-2 rounded-md *:hover:cursor-pointer border border-gray-700 z-10">
          <button
            className="flex flex-1 items-center gap-1"
            onClick={() => {
              setOpenEdit((prev) => !prev);
              setOpenDropDown(false);
            }}
          >
            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
            <h1>Edit</h1>
          </button>
          <button
            className="flex flex-1 items-center gap-1"
            onClick={() => {
              setOpenConfirmDelete(true);
              setOpenDropDown(false);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            <h1>Delete</h1>
          </button>
        </div>
      )}
      {openConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="h-48 w-96 bg-[#2a1f36] rounded-2xl p-2 flex flex-col">
            <h1 className="text-2xl">Delete User?</h1>
            <p>Deleting the user will permanently remove all information </p>
            <div className="flex mt-auto gap-4 *:hover:cursor-pointer">
              <button
                className="bg-gray-500 flex-1 py-2 rounded-xl"
                onClick={() => setOpenConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 flex-1 rounded-xl"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {openEdit && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="w-3xl h-64 rounded-2xl p-4 bg-[#2a1f36] flex flex-col gap-8">
            <h1 className="flex text-3xl">Edit</h1>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => handleEdit(e)}
            >
              <div className="flex gap-4">
                <input
                  className="flex-1 bg-[#120121] p-2 rounded-md"
                  value={editForm.firstname}
                  onChange={(e) => changeForm(e)}
                  name="firstname"
                ></input>
                <input
                  className="flex-1 bg-[#120121] p-2 rounded-md"
                  value={editForm.lastname}
                  name="lastname"
                  onChange={(e) => changeForm(e)}
                ></input>
              </div>
              <input
                value={editForm.username}
                className="flex-1 bg-[#120121] p-2 rounded-md"
                onChange={(e) => changeForm(e)}
                name="username"
              ></input>
              <div className="flex gap-4 *:hover:cursor-pointer justify-end">
                <button
                  className="py-2 bg-gray-500 w-1/4 rounded-xl"
                  onClick={() => setOpenEdit(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="py-2 bg-red-500 w-1/4 rounded-xl"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
