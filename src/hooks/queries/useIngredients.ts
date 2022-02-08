import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { Ingredient } from "types";

const fetchIngredients = async () => {
  const { data, error } = await supabase
    .from<Ingredient>("ingredients")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useIngredients() {
  return useQuery("ingredients", () => fetchIngredients());
}
