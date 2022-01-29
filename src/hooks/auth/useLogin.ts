import { Provider } from "@supabase/supabase-js";
import { supabase } from "lib/api";

export default function useLogin() {
  const login = async (provider: Provider) => {
    let { error } = await supabase.auth.signIn({ provider });
    if (error) console.log("Error: ", error.message);
  };

  return login;
}
