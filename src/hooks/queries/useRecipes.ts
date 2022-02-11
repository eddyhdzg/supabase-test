import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { Recipe } from "types";

const fetchRecipes = async () => {
  const { data, error } = await supabase
    .from<Recipe>("recipes")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useRecipes() {
  return useQuery("recipes", () => fetchRecipes());
}
