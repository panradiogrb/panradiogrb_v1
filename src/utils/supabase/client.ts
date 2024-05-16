/* Code was inspired by Supabase documentations at: https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs#next-steps*/

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
