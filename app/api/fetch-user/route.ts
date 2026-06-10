import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { userId } = await req.json();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", userId)
    .single();
  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  return Response.json(data, { status: 200 });
}
