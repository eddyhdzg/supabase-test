import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRecipes, useRecipesTable } from "hooks";
import { Recipe, WixRecipes } from "types";
import { RecipesCards, RecipesTable } from "organisms";
import IconButton from "@mui/material/IconButton";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useWixRecipes } from "hooks";
import { CreateRecipesForm } from "forms";
import { CenterLoader } from "components";

export default function RecipesTemplate() {
  const { data: dbRecipes = [], isLoading: dbIsLoading } = useRecipes();
  const { data: wixRecipes = [], isLoading: wixIsLoading } = useWixRecipes();

  if (dbIsLoading || wixIsLoading) {
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
      <RecipeTable dbRecipes={dbRecipes} wixRecipes={wixRecipes} />
    </>
  );
}

interface RecipeTableProps {
  dbRecipes: Recipe[];
  wixRecipes: WixRecipes[];
}

function RecipeTable({ dbRecipes, wixRecipes }: RecipeTableProps) {
  const table = useRecipesTable(dbRecipes);
  const [card, setCard] = useState(true);

  const handleClick = () => {
    setCard(!card);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <ul>
          <Box
            component="li"
            sx={{
              display: "flex",
            }}
          >
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              sx={{
                mr: 0.5,
              }}
            >
              Wix Recipes:
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {wixRecipes?.length}
            </Typography>
          </Box>

          <Box
            component="li"
            sx={{
              display: "flex",
            }}
          >
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              sx={{
                mr: 0.5,
              }}
            >
              DB Recipes:
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {dbRecipes?.length}
            </Typography>
          </Box>
        </ul>

        <div>
          <CreateRecipesForm
            disabled={dbRecipes?.length === wixRecipes?.length}
            sx={{
              mr: 1,
            }}
          />

          <IconButton aria-label="toggle-view" onClick={handleClick}>
            {card ? <TableRowsIcon /> : <DashboardIcon />}
          </IconButton>
        </div>
      </Box>
      {card ? (
        <RecipesCards
          rows={table.rows}
          page={table.page}
          gotoPage={table.gotoPage}
          state={table.state}
        />
      ) : (
        <RecipesTable
          getTableProps={table.getTableProps}
          headerGroups={table.headerGroups}
          rows={table.rows}
          prepareRow={table.prepareRow}
          gotoPage={table.gotoPage}
          state={table.state}
          page={table.page}
        />
      )}
    </Box>
  );
}
