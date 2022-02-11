import { Recipe } from "types";
import { HeaderGroup, Cell } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TableFooter,
} from "@mui/material";
import { CustomTablePagination } from "components";

export default function RecipesTable({
  getTableProps,
  headerGroups,
  rows,
  prepareRow,
  gotoPage,
  state,
  page,
}: any) {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        whiteSpace: "nowrap",
        overflow: "auto",
      }}
    >
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
        <Table aria-label="recipes table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (
                    column: HeaderGroup<Recipe> & {
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
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(
                    (
                      cell: Cell<Recipe> & {
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
          <TableFooter>
            <TableRow>
              <CustomTablePagination
                rows={rows}
                gotoPage={gotoPage}
                state={state}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
