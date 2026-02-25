import { supabase } from "../lib/supabase";

export async function savePushToken(token: string) {

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (!user) return;

  const { error } = await supabase
    .from("push_tokens")
    .upsert({
      user_id: user.id,
      token: token,
    });

  if (error)
    console.log("Save token error:", error);
}