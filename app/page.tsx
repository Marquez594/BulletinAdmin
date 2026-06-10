import {
  faSearch,
  faStickyNote,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabase } from "@/lib/supabase";
import type { UserType, PostType } from "@/types";
import UserSetting from "@/components/viewUserSettings";
import PostSetting from "@/components/viewPostSettings";
import Link from "next/link";
import Search from "@/components/search";

export default async function Home() {
  const { count: userCount, error: userCountError } = await supabase
    .from("users")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { count: postCount, error: postCountError } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
      head: true,
    });

  const { data: userData, error: usersError } = await supabase
    .from("users")
    .select("*")
    .order("date_created", { ascending: false })
    .limit(10);

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  const activity = [
    ...(userData ?? []).map((users) => ({
      type: "user",
      created_at: users.date_created,
      data: users,
    })),

    ...(postData ?? []).map((posts) => ({
      type: "post",
      created_at: posts.created_at,
      data: posts,
    })),
  ];
  activity.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  if (userCountError) console.log(userCountError);
  if (postCountError) console.log(postCountError);
  if (postError) console.log(postError);
  if (usersError) console.log(usersError);

  return (
    <div className="p-10 flex flex-col gap-6 ">
      <header className="flex items-center ">
        {/**Header */}
        <div className="flex flex-col">
          <h1 className="text-5xl text-pink-400 font-bold">Dashboard</h1>
          <p className="text-gray-400">
            Welcome, here are some quick useful information
          </p>
        </div>
        <Search option="both"></Search>
      </header>
      <section className="grid  gap-6 grid-cols-2">
        {/**Modules */}
        <div className="h-40 bg-[#2a1f36] rounded-2xl p-4 flex">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl">Users</h1>
            <h1 className="text-3xl">{userCount ?? "Unknown"}</h1>
          </div>
          <div className="ml-auto flex flex-col ">
            <Link href={"/users"}>
              <FontAwesomeIcon
                icon={faUser}
                className="p-2 bg-pink-400 rounded-md text-2xl text-[#2a1f36]"
              ></FontAwesomeIcon>
            </Link>
          </div>
        </div>
        <div className="h-40 bg-[#2a1f36] rounded-2xl p-4 flex">
          <div className="flex flex-col justify-between">
            <h1 className="text-xl">Posts</h1>
            <h1 className="text-3xl">{postCount ?? "Unknown"}</h1>
          </div>
          <div className="ml-auto flex flex-col">
            <Link href={"/posts"}>
              <FontAwesomeIcon
                icon={faStickyNote}
                className="p-2 bg-pink-400 rounded-md text-2xl text-[#2a1f36]"
              ></FontAwesomeIcon>
            </Link>
          </div>
        </div>
      </section>
      <section className="grid gap-6 grid-cols-3">
        <div className="h-128 bg-[#2a1f36] rounded-2xl col-span-2 flex flex-col">
          <div className="flex items-center p-4">
            <h1 className="text-xl font-bold">Recent Posts</h1>
            <Link href="/posts" className="ml-auto underline">
              View All
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full border-collapse table-fixed">
              <thead className="sticky top-0 z-10">
                <tr className="bg-pink-400">
                  <th className="py-2 w-1/4">Title</th>
                  <th>Text</th>
                  <th className="w-1/4">Manage</th>
                </tr>
              </thead>

              <tbody>
                {(postData as PostType[] | null)
                  ? postData?.map((post: PostType) => (
                      <tr
                        className="border-b border-gray-400 text-center h-12"
                        key={post.postid}
                      >
                        <td className="p-2">{post.title}</td>

                        <td className="overflow-x-auto whitespace-nowrap">
                          {post.content}
                        </td>
                        <td>
                          <PostSetting post={post} />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-128 bg-[#2a1f36] rounded-2xl ">
          {/**Recent Post Sections */}
          <div className="flex p-4 flex-col gap-4 h-full">
            <h1 className="text-2xl font-bold ">Recent Activity</h1>
            <div className="flex flex-col gap-4 h-full overflow-scroll">
              {activity.map((item, index) => {
                {
                  return item.type == "user" ? (
                    <h1 key={index} className="border-b border-gray-500">
                      User {item.data.username} was created
                    </h1>
                  ) : (
                    <h1 key={index} className="border-b border-gray-500">
                      Post {item.data.title} was created
                    </h1>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="h-96 bg-[#2a1f36]  rounded-2xl overflow-x-hidden ">
        <table className="w-full border-collapse ">
          <thead className="p-2 ">
            <tr className="bg-pink-400 ">
              <th className="py-3">UID</th>
              <th>Username</th>
              <th>Firstname</th>
              <th>Last Name</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(userData as UserType[] | null)
              ? userData?.map((user: UserType, index) => (
                  <tr
                    className="text-center border-b border-gray-400"
                    key={index}
                  >
                    <td className="py-2">{user.uid}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.date_created}</td>
                    <td className="flex justify-center items-center  h-full pt-2">
                      <UserSetting
                        uid={user.uid}
                        firstname={user.firstname}
                        lastname={user.lastname}
                        username={user.username}
                      ></UserSetting>
                    </td>
                  </tr>
                ))
              : null}
            <tr className="text-center border-b border-gray-400">
              <td className="py-2">233434</td>
              <td>Minus</td>
              <td>Firstname</td>
              <td>Lastname</td>
              <td>Yesterday</td>
              <td>E</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
