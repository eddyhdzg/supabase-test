import { useRecipesColumns } from "hooks";
import { useSearchParams } from "react-router-dom";
import { useTable } from "react-table";
import { Recipe } from "types";
import { useEffect, useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { useFuzzyGlobalFilter } from "hooks";
import { fuzzyTextFilterFn } from "utils";
import { recipesSearchFilters } from "constant";

type useRecipesTableProps = Recipe[];

export default function useRecipesTable(data: useRecipesTableProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const globalFilter = useFuzzyGlobalFilter(recipesSearchFilters);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );
  const columns = useRecipesColumns();

  const {
    page,
    setGlobalFilter,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    state,
  } = useTable<Recipe>(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
      globalFilter,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
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

  return {
    page,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    state,
  };
}
