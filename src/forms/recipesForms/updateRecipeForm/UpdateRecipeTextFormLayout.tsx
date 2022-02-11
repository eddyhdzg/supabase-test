import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { UpdateRecipeSchema } from "hooks";

interface UpdateRecipeFormLayoutProps {
  id?: string | number;
  name: "name" | "description" | "url";
  onSubmit: (newValue: string | number) => void;
}

export default function UpdateRecipeTextFormLayout({
  id,
  name,
  onSubmit,
}: UpdateRecipeFormLayoutProps) {
  const { control } = useFormContext<UpdateRecipeSchema>();
  const customId = `${name}-input-${id}`;

  return (
    <Controller
      name={name}
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
