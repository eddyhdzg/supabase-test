import { useCallback } from "react";
import { Row, IdType } from "react-table";
import { matchSorter } from "match-sorter";

const useFuzzyGlobalFilter = (filters: string[]) => {
  return useCallback(
    (rows: Row<object>[], _: IdType<object>[], query: string) => {
      return matchSorter(rows, query, {
        keys: filters.map((columnName) => `values.${columnName}`),
      });
    },
    [filters]
  );
};

export default useFuzzyGlobalFilter;
