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
import { useQuantitiesRowData, useQuantitiesTable } from "hooks";
import { HeaderGroup, Cell } from "react-table";
import { QuantityRowData } from "types";
import { CreateQuantityForm } from "forms";

export default function QuantitiesTemplate() {
  const { data = [] } = useQuantitiesRowData();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Quantities
      </Typography>
      <QuantitiesTable data={data} />
      <CreateQuantityForm />
    </>
  );
}

interface QuantitiesTableProps {
  data: QuantityRowData[];
}

function QuantitiesTable({ data }: QuantitiesTableProps) {
  const { getTableProps, headerGroups, rows, prepareRow } =
    useQuantitiesTable(data);

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
        <Table stickyHeader aria-label="quantities table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (
                    column: HeaderGroup<QuantityRowData> & {
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
                      cell: Cell<QuantityRowData> & {
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
