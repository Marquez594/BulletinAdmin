import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: Request) {
  const { userId, firstname, lastname, username } = await req.json();
  const { error: editError } = await supabaseAdmin
    .from("users")
    .update({
      firstname,
      lastname,
      username,
    })
    .eq("uid", userId);
  if (editError) {
    return Response.json({ error: editError.message }, { status: 400 });
  }
  return Response.json({ success: true });
}
