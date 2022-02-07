import { Paper, Avatar, Chip, Typography, Box, Divider } from "@mui/material";
import { useCustomer } from "hooks";
import { CenterLoader } from "components";
import { useParams } from "react-router-dom";
import { stringAvatar } from "utils";
import { CustomerSection, CustomerRecipesSection } from "organisms";
import { useCustomerData } from "hooks";

export default function Customer() {
  const { id } = useParams();
  const { data, isLoading } = useCustomer(id);
  const { fullName, fullAddress, dates, paymentMethod, plan } =
    useCustomerData();

  if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 640,
        m: "auto",
      }}
    >
      <Box
        sx={{
          p: {
            xxs: 2,
            xs: 3,
          },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Avatar alt="Avatar" {...stringAvatar(fullName)} />
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {fullName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {fullAddress}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {data?.email}
          </Typography>
          <Typography
            variant="subtitle1"
            component="a"
            href={`tel:${data?.phoneNumber?.toString()}`}
            gutterBottom
          >
            {data?.phoneNumber?.toString()}
          </Typography>
        </Box>
        <Chip
          label={data?.subscriptionStatus}
          color={data?.subscriptionStatus === "ACTIVE" ? "success" : undefined}
          sx={{
            position: "absolute",
            top: {
              xxs: 16,
              xs: 24,
            },
            right: {
              xxs: 16,
              xs: 24,
            },
          }}
        />
      </Box>
      <Divider />
      <CustomerSection title="Plan" rows={plan} />
      <Divider />
      <CustomerRecipesSection title="Recipes" recipes={data?.recipes} />
      <Divider />
      <CustomerSection title="Payment Method" rows={paymentMethod} />
      <Divider />
      <CustomerSection title="Dates" rows={dates} />
    </Paper>
  );
}
