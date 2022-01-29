import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "lib/api";
import { useQueryClient } from "react-query";

export default function useUser() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoadingUser(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
        if (!currentUser) {
          queryClient.removeQueries();
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loadingUser };
}
