"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();
  try {
    const response = await supabase.auth.signInWithPassword({ email, password });
    console.log("Authentication response:",response.data.user);
    if (response.error) {
      console.error('Authentication error', response.error.message)
      return { user: null, error: response.error.message };
    } else {
      return {user : response.data.user, error: null };
    }
  } catch (error) {
    console.error('Error occured', error)
    return { user: null, error: 'An unexpected error occurred.' };
  }
}

export async function logout() {
  const supabase = createClient();

  const response = await supabase.auth.signOut();

  if (response.error) {
    console.error("Error", response.error.message);
  } else {
    console.log("Sign out successful");
  }
}

export async function getUserRole(userId: string): Promise<{role: string | null, error: string | null}> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Failed to fetch user role:', error.message);
      return { role: null, error: error.message };
    }

    return { role: data.role, error: null };
  } catch (error) {
    console.error('Error occurred while fetching user role:', error);
    return { role: null, error: 'An unexpected error occurred.' };
  }
}

export async function getUserName(userId: string): Promise<{role: string | null, error: string | null}>{
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Failed to fetch user role:', error.message);
      return { role: null, error: error.message };
    }

    return { role: data.name, error: null };
  } catch (error) {
    console.error('Error occurred while fetching user role:', error);
    return { role: null, error: 'An unexpected error occurred.' };
  }



}

// export async function login(email: string, password: string) {
//   const supabase = createClient();
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.signInWithPassword({ email, password });

//   return { user, error };
// }

// export async function login(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     console.log(error);

//     // redirect("/error");
//   }

//   revalidatePath("/dashboard");
//   redirect("/dashboard");
// }
