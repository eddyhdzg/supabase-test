import { useMemo } from "react";
import { Column, Row } from "react-table";
import { QuantityRowData } from "types";
import { UpdateQuantityForm } from "forms";
import { DeleteQuantityForm } from "forms";

const useQuantitiesColumns = () => {
  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "id",
        accessor: "id",
      },
      {
        id: "quantity",
        Header: "Quantity",
        accessor: "quantity",
        className: "alignRight",
        Cell: ({
          value,
          row,
        }: {
          value: QuantityRowData["quantity"];
          row: Row<QuantityRowData>;
        }) => {
          return <UpdateQuantityForm id={row.original.id} quantity={value} />;
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
          value: QuantityRowData["quantity"];
          row: Row<QuantityRowData>;
        }) => {
          return (
            <DeleteQuantityForm
              id={row.original.id}
              disabled={Boolean(value)}
            />
          );
        },
      },
    ],
    []
  );
  return columns as readonly Column<QuantityRowData>[];
};

export default useQuantitiesColumns;
