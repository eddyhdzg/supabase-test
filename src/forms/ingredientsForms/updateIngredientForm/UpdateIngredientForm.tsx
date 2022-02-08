import { useEffect } from "react";
import {
  useUpdateIngredientForm,
  useUpdateIngredient,
  UpdateIngredientSchema,
  updateIngredientDefaultValues,
} from "hooks";
import { FormProvider } from "react-hook-form";
import { Ingredient } from "types";
import UpdateIngredientFormLayout from "./UpdateIngredientFormLayout";

export default function UpdateIngredientForm({
  id = "",
  ingredient,
}: Ingredient) {
  const { reset, ...form } = useUpdateIngredientForm();
  const updateIngredient = useUpdateIngredient(reset);

  useEffect(() => {
    const defaultValues: UpdateIngredientSchema =
      ingredient !== undefined ? { ingredient } : updateIngredientDefaultValues;
    reset(defaultValues);
  }, [reset, ingredient]);

  const onSubmit = (newIngredient: Ingredient["ingredient"]) => {
    if (ingredient !== newIngredient) {
      updateIngredient.mutate({ id, ingredient: newIngredient });
    }
  };

  return (
    <FormProvider reset={reset} {...form}>
      <UpdateIngredientFormLayout onSubmit={onSubmit} id={id} />
    </FormProvider>
  );
}
