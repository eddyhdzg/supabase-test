import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { Ingredient } from "types";
import { UpdateIngredientSchema } from "hooks";

interface UpdateIngredientFormLayoutProps {
  onSubmit: (newIngredient: Ingredient["ingredient"]) => void;
  id?: string;
}

export default function UpdateIngredientFormLayout({
  id,
  onSubmit,
}: UpdateIngredientFormLayoutProps) {
  const { control } = useFormContext<UpdateIngredientSchema>();
  const customId = `ingredient-input-${id}`;

  return (
    <Controller
      name="ingredient"
      control={control}
      render={({ field: { onBlur, ...field }, fieldState }) => {
        return (
          <FormControl>
            <TextField
              id={customId}
              variant="outlined"
              error={Boolean(fieldState.error)}
              onBlur={(e) => {
                if (e.target.value) {
                  onSubmit(e.target.value);
                }
              }}
              {...field}
            />
          </FormControl>
        );
      }}
    />
  );
}
