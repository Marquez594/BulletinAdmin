import { supabase } from "@/lib/supabase";

export async function DELETE(req: Request) {
  const { postid } = await req.json();
  const { error: deletePostError } = await supabase
    .from("posts")
    .delete()
    .eq("postid", postid);
  if (deletePostError) {
    return Response.json({ error: deletePostError.message }, { status: 400 });
  }
  return Response.json({ success: true }, { status: 200 });
}
