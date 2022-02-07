import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { QuantityRowData } from "types";

const fetchQuantitiesRowData = async () => {
  const { data, error } = await supabase
    .from<QuantityRowData>("quantities")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useQuantitiesRowDataRowData() {
  return useQuery("quantitiesRowData", () => fetchQuantitiesRowData());
}
