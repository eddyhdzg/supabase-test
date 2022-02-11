import { Box } from "@mui/material";
import { RecipeCard } from "components";
import { Recipe } from "types";
import { Row } from "react-table";
import { CustomTablePagination } from "components";

interface RecipesCardsProps {
  rows: Row<Recipe>[];
  page: Row<Recipe>[];
  gotoPage: any;
  state: any;
}

export default function RecipesCards({
  rows,
  page,
  gotoPage,
  state,
}: RecipesCardsProps) {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 2,
        }}
      >
        {page?.map((recipe) => (
          <RecipeCard key={recipe.original.id} {...recipe.original} />
        ))}
      </Box>
      <CustomTablePagination
        rows={rows}
        gotoPage={gotoPage}
        state={state}
        component="div"
      />
    </>
  );
}
