import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { NumberFormatInput } from "components";
import { Quantity } from "types";
import { UpdateQuantitySchema } from "hooks";

interface UpdateQuantityFormLayoutProps {
  onSubmit: (newQuantity: Quantity["quantity"]) => void;
  id?: string;
}

export default function UpdateQuantityFormLayout({
  id,
  onSubmit,
}: UpdateQuantityFormLayoutProps) {
  const { control } = useFormContext<UpdateQuantitySchema>();
  const customId = `quantity-input-${id}`;

  return (
    <Controller
      name="quantity"
      control={control}
      render={({ field: { onBlur, ...field }, fieldState }) => {
        return (
          <FormControl>
            <TextField
              id={customId}
              variant="outlined"
              error={Boolean(fieldState.error)}
              inputProps={{
                inputMode: "decimal",
                min: 0,
                thousandSeparator: true,
                decimalScale: 4,
              }}
              InputProps={{
                inputComponent: NumberFormatInput as any,
              }}
              onBlur={(e) => {
                if (e.target.value) {
                  onSubmit(Number(e.target.value));
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
