import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useRecipe } from "hooks";
import { useParams } from "react-router-dom";
import { CenterLoader } from "components";
import { displayHMS } from "utils";

export default function RecipesTemplate() {
  const { id } = useParams();
  const { data, isLoading } = useRecipe(id);
  const displayTime = displayHMS(data?.time || 0);

  if (isLoading) {
    return <CenterLoader />;
  }
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          mb: 4,
        }}
      >
        Recipes
      </Typography>

      <Card
        sx={{
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={data?.url}
          alt="recipe"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.description}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Data
          </Typography>
          <ul>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="body2" color="textSecondary">
                id:
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {data?.id}
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="body2" color="textSecondary">
                calories:
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {data?.calories} kcal
              </Typography>
            </Box>
            <Box
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="body2" color="textSecondary">
                time:
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {displayTime}
              </Typography>
            </Box>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
