import { useMemo } from "react";
import { Column } from "react-table";

const useCustomersColumns = () => {
  const columns: Column<object>[] = useMemo(() => {
    const customerColumns = [
      {
        id: "_id",
        Header: "id",
        accessor: "_id",
      },
      {
        id: "firstName",
        Header: "firstName",
        accessor: "firstName",
      },
      {
        id: "lastName",
        Header: "lastName",
        accessor: "lastName",
      },
      {
        id: "street",
        Header: "street",
        accessor: "street",
      },
      {
        id: "zipCode",
        Header: "zipCode",
        accessor: "zipCode",
      },
      {
        id: "state",
        Header: "state",
        accessor: "state",
      },
      {
        id: "phoneNumber",
        Header: "phoneNumber",
        accessor: "phoneNumber",
      },
      {
        id: "customerSID",
        Header: "customerSID",
        accessor: "customerSID",
      },
    ];

    return customerColumns;
  }, []);
  return columns;
};

export default useCustomersColumns;
