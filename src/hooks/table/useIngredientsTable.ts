import { useIngredientsColumns } from "hooks";
import { useSearchParams } from "react-router-dom";
import { useTable } from "react-table";
import { IngredientRowData } from "types";
import { useEffect, useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
} from "react-table";
import { useFuzzyGlobalFilter } from "hooks";
import { fuzzyTextFilterFn } from "utils";
import { ingredientsSearchFilters } from "constant";

type useIngredientsTableProps = IngredientRowData[];

export default function useIngredientsTable(data: useIngredientsTableProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const globalFilter = useFuzzyGlobalFilter(ingredientsSearchFilters);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );
  const columns = useIngredientsColumns();

  const { setGlobalFilter, getTableProps, headerGroups, rows, prepareRow } =
    useTable<IngredientRowData>(
      {
        columns,
        data,
        globalFilter,
        filterTypes,
      },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  const performantGlobalChange = useAsyncDebounce((value) => {
    setGlobalFilter(value);
  }, 200);

  useEffect(() => {
    setGlobalFilter(search || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    performantGlobalChange(search || "");
  }, [search, performantGlobalChange]);

  return { getTableProps, headerGroups, rows, prepareRow };
}
