import { supabase } from "lib/api";

export default function useLogout() {
  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error);
  };

  return handleLogout;
}
