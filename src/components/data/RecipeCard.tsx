import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import { Recipe } from "types";
import { Link } from "react-router-dom";

export default function RecipeCard({ id, name, description, url }: Recipe) {
  return (
    <Card
      component={Link}
      to={`/recipes/${id}`}
      sx={{
        textDecoration: "none",
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {url ? (
          <CardMedia component="img" height="140" image={url} alt="recipe" />
        ) : (
          <Skeleton
            variant="rectangular"
            height={140}
            width="100%"
            animation={false}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
