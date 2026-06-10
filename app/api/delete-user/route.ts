import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(req: Request) {
  const { userId } = await req.json();
  const { error: deleteUserAdminError } =
    await supabaseAdmin.auth.admin.deleteUser(userId);
  if (deleteUserAdminError) {
    return Response.json(
      { error: deleteUserAdminError.message },
      { status: 400 },
    );
  }

  const { error: deleteUserError } = await supabaseAdmin
    .from("users")
    .delete()
    .eq("uid", userId);
  if (deleteUserError) {
    return Response.json({ error: deleteUserError.message }, { status: 400 });
  }

  return Response.json({ sucess: true });
}
