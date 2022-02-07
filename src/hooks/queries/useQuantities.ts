import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { Quantity } from "types";

const fetchQuantities = async () => {
  const { data, error } = await supabase
    .from<Quantity>("quantities")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useQuantities() {
  return useQuery("quantities", () => fetchQuantities());
}
