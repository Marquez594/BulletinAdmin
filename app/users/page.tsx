import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import UserFilters from "@/components/userFilters";
import UserSetting from "@/components/viewUserSettings";
import type { UserType } from "@/types";
import { supabase } from "@/lib/supabase";
import Search from "@/components/search";

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<{ sort: string }>;
}) {
  const { sort = "createdLastest" } = await searchParams;
  let query = supabase.from("users").select("*");
  if (sort == "createdLatest") {
    query = query.order("date_created", { ascending: false });
  } else if (sort == "createdOldest") {
    query = query.order("date_created", { ascending: true });
  } else if (sort == "UsernameAZ") {
    query = query.order("username", { ascending: true });
  } else if (sort == "UsernameZA") {
    query = query.order("username", { ascending: false });
  }
  const { data: userData } = await query;

  return (
    <div className="p-10 flex flex-col gap-6">
      <header className="flex items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl text-pink-400 font-bold">Users</h1>
          <p className="text-gray-400">
            View All users, look up users and manage their accounts
          </p>
        </div>
        <Search option="user"></Search>
      </header>

      <UserFilters></UserFilters>

      <div className="w-full h-128 bg-[#2a1f36] rounded-2xl flex flex-col">
        <h1 className="text-2xl p-4">List of Users</h1>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
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
    </div>
  );
}
