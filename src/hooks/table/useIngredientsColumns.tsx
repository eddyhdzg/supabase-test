import { useMemo } from "react";
import { Column, Row } from "react-table";
import { IngredientRowData } from "types";
import { UpdateIngredientForm } from "forms";
import { DeleteIngredientForm } from "forms";

const useIngredientsColumns = () => {
  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "id",
        accessor: "id",
      },
      {
        id: "ingredient",
        Header: "Ingredient",
        accessor: "ingredient",
        className: "alignRight",
        Cell: ({
          value,
          row,
        }: {
          value: IngredientRowData["ingredient"];
          row: Row<IngredientRowData>;
        }) => {
          return (
            <UpdateIngredientForm id={row.original.id} ingredient={value} />
          );
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
          value: IngredientRowData["ingredient"];
          row: Row<IngredientRowData>;
        }) => {
          return (
            <DeleteIngredientForm
              id={row.original.id}
              disabled={Boolean(value)}
            />
          );
        },
      },
    ],
    []
  );
  return columns as readonly Column<IngredientRowData>[];
};

export default useIngredientsColumns;
