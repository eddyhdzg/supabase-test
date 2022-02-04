import { useEffect, useMemo } from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  Avatar,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { stringAvatar } from "utils";
import {
  useCustomers,
  useStore,
  useCustomersColumns,
  useFuzzyGlobalFilter,
} from "hooks";
import { fuzzyTextFilterFn } from "utils";
import { customersSearchFilters } from "constant";
import { Customer } from "types";

interface TableProps {
  data: Customer[];
}

function CustomersTemplate({ data }: TableProps) {
  const columns = useCustomersColumns();
  const globalFilter = useFuzzyGlobalFilter(customersSearchFilters);
  const filterTypes = useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  );

  const { rows, setGlobalFilter } = useTable<Customer>(
    {
      // @ts-ignore
      columns,
      data,
      globalFilter,
      filterTypes,
    },
    useFilters,
    useGlobalFilter
  );

  const { customers } = useStore(({ customers }) => ({ customers }));

  const performantGlobalChange = useAsyncDebounce((value) => {
    setGlobalFilter(value);
  }, 200);

  useEffect(() => {
    setGlobalFilter(customers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    performantGlobalChange(customers);
  }, [customers, performantGlobalChange]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Customers {customers}
      </Typography>
      <List
        sx={{
          mx: -3,
        }}
      >
        {rows?.map(
          ({
            original: { _id, firstName, lastName, street, zipCode, state },
          }) => {
            const name = (firstName || "") + " " + (lastName || "");
            return (
              <ListItemButton
                key={_id}
                component={Link}
                to={`/customers/${_id}`}
              >
                <ListItemAvatar>
                  <Avatar alt="Avatar" {...stringAvatar(name)} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${firstName} ${lastName}`}
                  secondary={`${street}, ${zipCode} ${state}`}
                />
                <ChevronRightIcon />
              </ListItemButton>
            );
          }
        )}
      </List>
    </>
  );
}

export default function CustomersTemplateWrapper() {
  const { data = [] } = useCustomers();
  return <CustomersTemplate data={data} />;
}
