import { Provider } from "@supabase/supabase-js";
import { supabase } from "lib/api";

interface AuthButtonProps {
  provider: "google" | "github";
  children: React.ReactNode;
}

export default function AuthButton({ children, provider }: AuthButtonProps) {
  const handleOAuthLogin = async (provider: Provider) => {
    let { error } = await supabase.auth.signIn({ provider });
    if (error) console.log("Error: ", error.message);
  };
  return (
    <span className="block rounded-sm shadow-sm">
      <button
        onClick={() => handleOAuthLogin(provider)}
        type="button"
        className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:outline-none dark:focus:border-zinc-500 dark:focus:shadow-outline-zinc dark:active:bg-zinc-500 transition duration-150 ease-in-out"
      >
        {children}
      </button>
    </span>
  );
}
