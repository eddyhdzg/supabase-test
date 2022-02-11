import { useMemo } from "react";
import { useCreateRecipes, useWixRecipes, useRecipes } from "hooks";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import { SxProps, Theme } from "@mui/material";
import { createRecipeProps } from "hooks/mutations/recipesMutations/useCreateRecipes";

interface CreateRecipesFormProps {
  sx?: SxProps<Theme> | undefined;
  disabled?: boolean;
}

export default function CreateRecipesForm(props: CreateRecipesFormProps) {
  const createRecipes = useCreateRecipes();
  const { data: wixRecipes = [] } = useWixRecipes();
  const { data: dbRecipes = [] } = useRecipes();

  const newRecipes: createRecipeProps = useMemo(() => {
    const ids = dbRecipes.map((dbRecipe) => dbRecipe.id) as string[];
    const idsSet = new Set<string>(ids);

    return wixRecipes
      .filter((wixRecipe) => !idsSet.has(wixRecipe._id))
      .map((wixRecipe) => {
        return {
          _id: wixRecipe._id,
          name: wixRecipe.title,
        };
      });
  }, [dbRecipes, wixRecipes]);

  return (
    <IconButton
      aria-label="update-recipes"
      size="large"
      onClick={() => {
        createRecipes.mutate(newRecipes);
      }}
      {...props}
    >
      <UpdateIcon />
    </IconButton>
  );
}
