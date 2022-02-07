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
import { useCustomers, useCustomersTable } from "hooks";
import { Customer } from "types";

export default function CustomersTemplate() {
  const { data = [] } = useCustomers();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Customers
      </Typography>
      <CustomerTable data={data} />
    </>
  );
}

interface CustomerTableProps {
  data: Customer[];
}

function CustomerTable({ data }: CustomerTableProps) {
  const { rows } = useCustomersTable(data);

  return (
    <List
      sx={{
        mx: {
          xxs: -2,
          xs: -3,
        },
      }}
    >
      {rows?.map(
        ({
          original: { _id, firstName, lastName, street, zipCode, state },
        }) => {
          const name = (firstName || "") + " " + (lastName || "");
          return (
            <ListItemButton key={_id} component={Link} to={`/customers/${_id}`}>
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
  );
}
