import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { UpdateRecipeSchema } from "hooks";
import { NumberFormatInput } from "components";

interface UpdateRecipeFormLayoutProps {
  id?: string | number;
  name: "calories";
  onSubmit: (newValue: string | number) => void;
}

export default function UpdateRecipeNumberFormLayout({
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
              InputProps={{
                inputComponent: NumberFormatInput as any,
              }}
              inputProps={{
                inputMode: "decimal",
                min: 0,
                decimalScale: 2,
              }}
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
