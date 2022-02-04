import { useMemo } from "react";
import { fuzzyTextFilterFn } from "utils";

const useFilterTypes = (filters: string[]) => {
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,

      // @ts-ignore
      text: (rows, id, filterValue) => {
        // @ts-ignore
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  return filterTypes;
};

export default useFilterTypes;
