import { Row } from "react-table";
import { matchSorter } from "match-sorter";

const fuzzyTextFilterFn = (
  rows: Row<object>[],
  id: string,
  filterValue: string
) => {
  return matchSorter(rows, filterValue, {
    keys: [(row: Row<object>) => row.values[id]],
  });
};

fuzzyTextFilterFn.autoRemove = (val: string) => !val;

export default fuzzyTextFilterFn;
