import { useEffect } from "react";
import {
  useUpdateRecipeForm,
  useUpdateRecipe,
  updateRecipeDefaultValues,
} from "hooks";
import { FormProvider } from "react-hook-form";
import UpdateRecipeNumberFormLayout from "./UpdateRecipeNumberFormLayout";
import UpdateRecipeTextFormLayout from "./UpdateRecipeTextFormLayout";
import UpdateRecipeTimeFormLayout from "./UpdateRecipeTimeFormLayout";

interface UpdateRecipeTextFormProps {
  id?: string | number;
  column: "name" | "description" | "url" | "calories" | "time";
  value?: string | number;
}

export default function UpdateRecipeForm({
  id = "",
  column,
  value,
}: UpdateRecipeTextFormProps) {
  const { reset, ...form } = useUpdateRecipeForm();
  const updateRecipe = useUpdateRecipe(reset);

  useEffect(() => {
    const defaultValue = value ?? updateRecipeDefaultValues[column];
    reset({
      [column]: defaultValue,
    });
  }, [column, reset, value]);

  const onSubmit = (newValue: string | number) => {
    if (value !== newValue) {
      updateRecipe.mutate({ id, column, value: newValue });
    }
  };

  return (
    <FormProvider reset={reset} {...form}>
      {column === "calories" ? (
        <UpdateRecipeNumberFormLayout
          name={column}
          onSubmit={onSubmit}
          id={id}
        />
      ) : column === "time" ? (
        <UpdateRecipeTimeFormLayout name={column} onSubmit={onSubmit} id={id} />
      ) : (
        <UpdateRecipeTextFormLayout name={column} onSubmit={onSubmit} id={id} />
      )}
    </FormProvider>
  );
}
