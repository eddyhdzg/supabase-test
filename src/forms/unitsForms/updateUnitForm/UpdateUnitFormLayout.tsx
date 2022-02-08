import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { Unit } from "types";
import { UpdateUnitSchema } from "hooks";

interface UpdateUnitFormLayoutProps {
  onSubmit: (newUnit: Unit["unit"]) => void;
  id?: string;
}

export default function UpdateUnitFormLayout({
  id,
  onSubmit,
}: UpdateUnitFormLayoutProps) {
  const { control } = useFormContext<UpdateUnitSchema>();
  const customId = `unit-input-${id}`;

  return (
    <Controller
      name="unit"
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
