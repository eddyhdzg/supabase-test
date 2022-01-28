import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import Auth from "components/Auth";
import Home from "components/Home";
import { User } from "@supabase/supabase-js";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  // const [mode, setMode] = useState(true);

  // const handleClick = () => {
  //   setMode(!mode);
  // };

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  return (
    <div className="dark">
      <div className="min-w-full min-h-screen flex items-center justify-center dark:bg-gray-800">
        {!user ? <Auth /> : <Home user={user} />}
      </div>
    </div>
  );
}
