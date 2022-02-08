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
import { useUnitsRowData, useUnitsTable } from "hooks";
import { HeaderGroup, Cell } from "react-table";
import { UnitRowData } from "types";
import { CreateUnitForm } from "forms";

export default function UnitsTemplate() {
  const { data = [] } = useUnitsRowData();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Units
      </Typography>
      <UnitsTable data={data} />
      <CreateUnitForm />
    </>
  );
}

interface UnitsTableProps {
  data: UnitRowData[];
}

function UnitsTable({ data }: UnitsTableProps) {
  const { getTableProps, headerGroups, rows, prepareRow } = useUnitsTable(data);

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
        <Table aria-label="units table" {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (
                    column: HeaderGroup<UnitRowData> & {
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
                      cell: Cell<UnitRowData> & {
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
