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
import { Row } from "react-table";

interface CustomersTemplateProps {
  data: Customer[];
}

function CustomersTemplate({ data }: CustomersTemplateProps) {
  const { rows } = useCustomersTable(data);
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Customers
      </Typography>
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
