import { useEffect, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { useCustomers, useCustomersColumns, useFuzzyGlobalFilter } from "hooks";
import { fuzzyTextFilterFn } from "utils";
import { customersSearchFilters } from "constant";
import { Customer } from "types";
import { useSearchParams } from "react-router-dom";

type useCustomersTableProps = Customer[];

export default function useCustomersTable(data: useCustomersTableProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const columns = useCustomersColumns();
  const globalFilter = useFuzzyGlobalFilter(customersSearchFilters);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );

  const { rows, setGlobalFilter } = useTable<Customer>(
    {
      // @ts-ignore
      columns,
      data,
      globalFilter,
      filterTypes,
    },
    useFilters,
    useGlobalFilter
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

  return { rows };
}
