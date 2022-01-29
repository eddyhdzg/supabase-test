import { useEffect } from "react";
import { Paper, Avatar, Typography, Box } from "@mui/material";
import { useFakeClient, useHeader } from "hooks";

export default function Customer() {
  const { onChangeRoute } = useHeader();

  useEffect(() => {
    onChangeRoute({ text: "Customer", url: "/cursomers" });
  }, [onChangeRoute]);

  const client = useFakeClient();

  const name = `${client.firstName} ${client.lastName}`;
  const address = `${client.street}, ${client.zipCode} ${client.state}`;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        alt="Avatar"
        src={client.avatar}
        sx={{
          mr: 2,
        }}
      />
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{address}</Typography>
        <Typography variant="subtitle1">{client.email}</Typography>
        <Typography variant="subtitle1">{client.phoneNumber}</Typography>
        <Typography variant="subtitle1">{client.birthDate}</Typography>
        <Typography variant="subtitle1">{client.planId}</Typography>
        <Typography variant="subtitle1">{client.lateActivation}</Typography>
        <Typography variant="subtitle1">{client.customerSID}</Typography>
        <Typography variant="subtitle1">{client.subscriptionSID}</Typography>
        <Typography variant="subtitle1">{client.lastFour}</Typography>
        <Typography variant="subtitle1">{client.cardType}</Typography>
        <Typography variant="subtitle1">{client.suscriptionStatus}</Typography>
        <Typography variant="subtitle1">{client.creationDate}</Typography>
        <Typography variant="subtitle1">{client.cancelDate}</Typography>
        <Typography variant="subtitle1">{client.recipeID}</Typography>
      </Box>
    </Paper>
  );
}
