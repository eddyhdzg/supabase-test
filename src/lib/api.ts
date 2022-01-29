import { createClient } from "@supabase/supabase-js";

const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL as string;
const REACT_APP_SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY as string;

export const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_KEY
);
