import { useMemo } from "react";
import { Column, Row } from "react-table";
import { UnitRowData } from "types";
import { UpdateUnitForm } from "forms";
import { DeleteUnitForm } from "forms";

const useUnitsColumns = () => {
  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "id",
        accessor: "id",
      },
      {
        id: "unit",
        Header: "Unit",
        accessor: "unit",
        className: "alignRight",
        Cell: ({
          value,
          row,
        }: {
          value: UnitRowData["unit"];
          row: Row<UnitRowData>;
        }) => {
          return <UpdateUnitForm id={row.original.id} unit={value} />;
        },
      },
      {
        id: "usedIn",
        Header: "Used In",
        accessor: "usedIn",
        className: "alignRight",
      },
      {
        id: "delete",
        Header: "Delete",
        accessor: "usedIn",
        className: "alignRight",
        Cell: ({
          value,
          row,
        }: {
          value: UnitRowData["usedIn"];
          row: Row<UnitRowData>;
        }) => {
          return (
            <DeleteUnitForm id={row.original.id} disabled={Boolean(value)} />
          );
        },
      },
    ],
    []
  );
  return columns as readonly Column<UnitRowData>[];
};

export default useUnitsColumns;
