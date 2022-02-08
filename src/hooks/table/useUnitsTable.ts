import { useUnitsColumns } from "hooks";
import { useSearchParams } from "react-router-dom";
import { useTable } from "react-table";
import { UnitRowData } from "types";
import { useEffect, useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
} from "react-table";
import { useFuzzyGlobalFilter } from "hooks";
import { fuzzyTextFilterFn } from "utils";
import { unitsSearchFilters } from "constant";

type useUnitsTableProps = UnitRowData[];

export default function useUnitsTable(data: useUnitsTableProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const globalFilter = useFuzzyGlobalFilter(unitsSearchFilters);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );
  const columns = useUnitsColumns();

  const { setGlobalFilter, getTableProps, headerGroups, rows, prepareRow } =
    useTable<UnitRowData>(
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
