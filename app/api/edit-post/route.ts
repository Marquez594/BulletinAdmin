import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: Request) {
  const { postid, title, content } = await req.json();
  const { error: editPostError } = await supabaseAdmin
    .from("posts")
    .update({
      title,
      content,
    })
    .eq("postid", postid);
  if (editPostError) {
    return Response.json({ error: editPostError.message }, { status: 400 });
  }

  return Response.json({ success: true }, { status: 200 });
}
