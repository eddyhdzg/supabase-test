import { useDeleteRecipe } from "hooks";
import { Recipe } from "types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteRecipeFormProps extends Pick<Recipe, "id"> {
  disabled?: boolean;
}

export default function DeleteRecipeForm({
  id = "",
  disabled,
}: DeleteRecipeFormProps) {
  const deleteRecipe = useDeleteRecipe();

  return (
    <IconButton
      aria-label="delete"
      size="large"
      disabled={disabled}
      onClick={() => {
        deleteRecipe.mutate({ id });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
