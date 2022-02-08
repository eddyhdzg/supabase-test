import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { UnitRowData } from "types";

const fetchUnitsRowData = async () => {
  const { data, error } = await supabase
    .from<UnitRowData>("units")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useUnitsRowDataRowData() {
  return useQuery("unitsRowData", () => fetchUnitsRowData());
}
