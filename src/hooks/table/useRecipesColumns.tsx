import { useMemo } from "react";
import { Column, Row } from "react-table";
import { Recipe } from "types";
import { UpdateRecipeForm } from "forms";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const useRecipesColumns = () => {
  const columns = useMemo(
    () => [
      {
        id: "id",
        Header: "id",
        accessor: "id",
      },
      {
        id: "name",
        Header: "Name",
        accessor: "name",
        Cell: ({ value, row }: { value: Recipe["name"]; row: Row<Recipe> }) => {
          return (
            <UpdateRecipeForm
              id={row.original.id}
              column="name"
              value={value}
            />
          );
        },
      },
      {
        id: "description",
        Header: "Description",
        accessor: "description",
        Cell: ({
          value,
          row,
        }: {
          value: Recipe["description"];
          row: Row<Recipe>;
        }) => {
          return (
            <UpdateRecipeForm
              id={row.original.id}
              column="description"
              value={value}
            />
          );
        },
      },
      {
        id: "calories",
        Header: "Calories",
        accessor: "calories",
        Cell: ({
          value,
          row,
        }: {
          value: Recipe["calories"];
          row: Row<Recipe>;
        }) => {
          return (
            <UpdateRecipeForm
              id={row.original.id}
              column="calories"
              value={value}
            />
          );
        },
      },
      {
        id: "url",
        Header: "Image",
        accessor: "url",
        Cell: ({ value, row }: { value: Recipe["url"]; row: Row<Recipe> }) => {
          return (
            <UpdateRecipeForm id={row.original.id} column="url" value={value} />
          );
        },
      },
      {
        id: "time",
        Header: "Time",
        accessor: "time",
        Cell: ({ value, row }: { value: Recipe["time"]; row: Row<Recipe> }) => {
          return (
            <UpdateRecipeForm
              id={row.original.id}
              column="time"
              value={value}
            />
          );
        },
      },
      {
        id: "actions",
        Header: "Actions",
        className: "alignRight",
        Cell: ({ row }: { row: Row<Recipe> }) => {
          return (
            <Link to={`/recipes/${row.original.id}`}>
              <IconButton aria-label="delete" size="large">
                <ArrowForwardIcon />
              </IconButton>
            </Link>
          );
        },
      },
    ],
    []
  );
  return columns as readonly Column<Recipe>[];
};

export default useRecipesColumns;
