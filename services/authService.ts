import { supabase } from "../lib/supabase";

export async function registerUser(
  nama: string,
  email: string,
  password: string,
  no_wa?: string
) {

  const { data, error } =
    await supabase.auth.signUp({

      email,
      password,

      options: {
        data: {
          nama,
          no_wa,
          role: "user",
        },
      },

    });

  if (error) throw error;

  return data;
}


export async function loginUser(
  email: string,
  password: string
) {

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}


export async function logoutUser() {

  await supabase.auth.signOut();

}