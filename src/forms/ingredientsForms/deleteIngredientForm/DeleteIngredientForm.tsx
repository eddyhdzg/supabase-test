import { useDeleteIngredient } from "hooks";
import { Ingredient } from "types";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteIngredientFormProps extends Pick<Ingredient, "id"> {
  disabled?: boolean;
}

export default function DeleteIngredientForm({
  id = "",
  disabled,
}: DeleteIngredientFormProps) {
  const deleteIngredient = useDeleteIngredient();

  return (
    <IconButton
      aria-label="delete"
      size="large"
      disabled={disabled}
      onClick={() => {
        deleteIngredient.mutate({ id });
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
