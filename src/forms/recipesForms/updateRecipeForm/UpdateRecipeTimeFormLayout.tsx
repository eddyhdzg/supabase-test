import { Controller, useFormContext } from "react-hook-form";
import { UpdateRecipeSchema } from "hooks";
import { TimePicker } from "components";

interface UpdateRecipeFormLayoutProps {
  id?: string | number;
  name: "time";
  onSubmit: (newValue: string | number) => void;
}

export default function UpdateRecipeTextFormLayout({
  id,
  name,
  onSubmit,
}: UpdateRecipeFormLayoutProps) {
  const { control } = useFormContext<UpdateRecipeSchema>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, ref, value, ...field }, fieldState }) => {
        return (
          <TimePicker
            label="Time"
            error={Boolean(fieldState.error)}
            value={value}
            onBlur={() => {
              if (value !== undefined) {
                onSubmit(value);
              }
            }}
            {...field}
          />
        );
      }}
    />
  );
}
