import { TablePagination } from "@mui/material";
import { TablePaginationActions } from "components";
import { TableInstance } from "react-table";

interface ICustomTablePaginationProps
  extends Pick<TableInstance<object>, "rows" | "gotoPage" | "state"> {
  component?: "div" | "td";
}

export default function CustomTablePagination({
  rows,
  gotoPage,
  component = "td",
  state: { pageIndex },
}: ICustomTablePaginationProps) {
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    gotoPage(newPage);
  };

  return (
    <TablePagination
      count={rows.length}
      rowsPerPageOptions={[10]}
      rowsPerPage={10}
      page={pageIndex}
      onPageChange={handleChangePage}
      ActionsComponent={TablePaginationActions}
      component={component}
    />
  );
}
