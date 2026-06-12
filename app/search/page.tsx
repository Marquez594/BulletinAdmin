import Search from "@/components/search";
import SearchFilters from "@/components/searchFilters";
import PostSetting from "@/components/viewPostSettings";
import UserSetting from "@/components/viewUserSettings";
import { supabase } from "@/lib/supabase";
import { PostUserType, type UserType } from "@/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    users?: string;
    posts?: string;
    sort?: string;
  }>;
}) {
  const {
    q = "",
    users = "true",
    posts = "true",
    sort = "createdLastest",
  } = await searchParams;

  let userQuerey = supabase
    .from("users")
    .select("*")
    .ilike("username", `%${q}%`);
  let postQuerey = supabase.from("posts").select("*").ilike("title", `%${q}%`);
  if (sort === "createdLatest") {
    userQuerey = userQuerey.order("date_created", { ascending: false });
    postQuerey = postQuerey.order("created_at", { ascending: false });
  } else if (sort === "createdOldest") {
    userQuerey = userQuerey.order("date_created", { ascending: true });
    postQuerey = postQuerey.order("created_at", { ascending: true });
  } else if (sort === "AZ") {
    userQuerey = userQuerey.order("username", { ascending: true });
    postQuerey = postQuerey.order("title", { ascending: true });
  } else if (sort === "ZA") {
    userQuerey = userQuerey.order("username", { ascending: false });
    postQuerey = postQuerey.order("title", { ascending: false });
  }

  const [{ data: userData }, { data: postData }] = await Promise.all([
    users === "true" ? userQuerey : Promise.resolve({ data: null }),
    posts === "true" ? postQuerey : Promise.resolve({ data: null }),
  ]);

  return (
    <div className="md:p-10 flex flex-col gap-6 p-4">
      <header className="flex items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl text-pink-400 font-bold">Search</h1>
          <p className="text-gray-400">Results of search</p>
        </div>
        <Search
          option={
            posts == "true" && users == "true"
              ? "both"
              : posts == "true" && users == "false"
                ? "post"
                : posts == "false" && users == "true"
                  ? "user"
                  : "both"
          }
        ></Search>
      </header>

      <SearchFilters></SearchFilters>

      {posts == "true" && (
        <div className="w-full h-96 bg-[#2a1f36] rounded-2xl flex flex-col">
          <h1 className="text-2xl p-4">Posts</h1>
          <div className="flex-1 overflow-y-auto">
            <table className="lg:min-w-full min-w-200">
              <thead className="sticky top-0 z-10">
                <tr className="bg-pink-400">
                  <th className="p-2">Post ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Created By</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(postData as PostUserType[] | null)
                  ? postData?.map((post: PostUserType) => (
                      <tr
                        className="text-center border-b border-gray-400"
                        key={post.postid}
                      >
                        <td className="py-2">{post.postid}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post?.users?.username ?? "None"}</td>
                        <td>{post.created_at}</td>
                        <td>
                          <PostSetting post={post} showDetail={false} />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {users == "true" && (
        <div className="w-full h-96 bg-[#2a1f36] rounded-2xl flex flex-col">
          <h1 className="text-2xl p-4">Users</h1>
          <div className="flex-1 overflow-y-auto">
            <table className="lg:min-w-full min-w-200">
              <thead className="sticky top-0 z-10">
                <tr className="bg-pink-400">
                  <th className="p-2">UID</th>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(userData as UserType[] | null)
                  ? userData?.map((user: UserType) => (
                      <tr
                        className="text-center border-b border-gray-400"
                        key={user.uid}
                      >
                        <td className="py-2">{user.uid}</td>
                        <td>{user.username}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.date_created}</td>
                        <td className="flex justify-center items-center pt-2">
                          <UserSetting
                            uid={user.uid}
                            firstname={user.firstname}
                            lastname={user.lastname}
                            username={user.username}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
