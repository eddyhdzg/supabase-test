import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import { useIngredientsRowData, useIngredientsTable } from "hooks";
import { HeaderGroup, Cell } from "react-table";
import { IngredientRowData } from "types";
import { CreateIngredientForm } from "forms";

export default function IngredientsTemplate() {
  const { data = [] } = useIngredientsRowData();

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mb: 4,
        }}
      >
        Ingredients
      </Typography>
      <IngredientsTable data={data} />
      <CreateIngredientForm />
    </>
  );
}

interface IngredientsTableProps {
  data: IngredientRowData[];
}

function IngredientsTable({ data }: IngredientsTableProps) {
  const { getTableProps, headerGroups, rows, prepareRow } =
    useIngredientsTable(data);

  return (
    <Paper elevation={3}>
      <TableContainer
        sx={{
          whiteSpace: "nowrap",
          "& th, & td": {
            borderBottomColor: "divider",
          },
          "& tbody tr:last-child th, tbody tr:last-child td": {
            borderBottom: "none",
          },
        }}
      >
        <Table aria-label="ingredients table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (
                    column: HeaderGroup<IngredientRowData> & {
                      tabIndex?: number;
                      className?: string;
                    }
                  ) => (
                    <TableCell
                      onKeyPress={() => {
                        column.toggleSortBy();
                      }}
                      {...column.getHeaderProps([
                        column.getSortByToggleProps(),
                        {
                          className: column?.className,
                        },
                      ])}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(
                    (
                      cell: Cell<IngredientRowData> & {
                        column: {
                          className?: string;
                        };
                      }
                    ) => {
                      return (
                        <TableCell
                          {...cell.getCellProps({
                            className: cell.column.className,
                          })}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    }
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
