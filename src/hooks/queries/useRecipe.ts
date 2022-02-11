import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { Recipe } from "types";

const fetchRecipes = async (id?: string) => {
  const { data, error } = await supabase
    .from<Recipe>("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useRecipe(id?: string) {
  return useQuery(["recipe", id], () => fetchRecipes(id));
}
