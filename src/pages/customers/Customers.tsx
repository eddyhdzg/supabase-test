import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { useFakeClients } from "hooks";

export default function Customers() {
  const clients = useFakeClients();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Customers
      </Typography>
      <List
        sx={{
          mx: -3,
        }}
      >
        {clients.map(
          ({ id, firstName, lastName, avatar, street, zipCode, state }) => (
            <Fragment key={id}>
              <ListItemButton component={Link} to={`/customers/${id}`}>
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${firstName} ${lastName}`}
                  secondary={`${street}, ${zipCode} ${state}`}
                />
                <ChevronRightIcon />
              </ListItemButton>
            </Fragment>
          )
        )}
      </List>
    </>
  );
}
