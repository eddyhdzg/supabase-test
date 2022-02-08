import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { IngredientRowData } from "types";

const fetchIngredientsRowData = async () => {
  const { data, error } = await supabase
    .from<IngredientRowData>("ingredients")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useIngredientsRowDataRowData() {
  return useQuery("ingredientsRowData", () => fetchIngredientsRowData());
}
