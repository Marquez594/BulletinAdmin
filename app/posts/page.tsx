import PostFilters from "@/components/postFilters";
import Search from "@/components/search";
import PostSetting from "@/components/viewPostSettings";
import { supabase } from "@/lib/supabase";
import { PostType, PostUserType } from "@/types";

export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ sort: string }>;
}) {
  const { sort = "createdLastest" } = await searchParams;
  let query = supabase.from("posts").select(`*, users (username)`);
  if (sort == "createdLatest") {
    query = query.order("created_at", { ascending: false });
  } else if (sort == "createdOldest") {
    query = query.order("created_at", { ascending: true });
  } else if (sort == "TitleAZ") {
    query = query.order("title", { ascending: true });
  } else if (sort == "TitleZA") {
    query = query.order("title", { ascending: false });
  }
  const { data: postData } = await query;

  return (
    <div className="md:p-10 flex flex-col gap-6 p-4">
      <header className="flex items-center">
        <div className="flex flex-col">
          <h1 className="md:text-5xl text-pink-400 font-bold text-2xl">Posts</h1>
          <p className="text-gray-400 text-sm">
            View all posts, sort them and search for specific posts
          </p>
        </div>
        <Search option="post"></Search>
      </header>

      <PostFilters></PostFilters>

      <div className="w-full h-128 bg-[#2a1f36] rounded-2xl flex flex-col">
        <h1 className="text-2xl p-4">List of Posts</h1>

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
    </div>
  );
}
