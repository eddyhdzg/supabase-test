import { useCreateIngredientForm, useCreateIngredient } from "hooks";
import { FormProvider } from "react-hook-form";
import CreateIngredientFormLayout from "./CreateIngredientFormLayout";

export default function CreateIngredientForm() {
  const form = useCreateIngredientForm();
  const createIngredient = useCreateIngredient(form.reset);

  const onSubmit = form.handleSubmit((values, e) => {
    e?.preventDefault();
    createIngredient.mutate({ ingredient: values.ingredient });
  });

  return (
    <FormProvider {...form}>
      <CreateIngredientFormLayout onSubmit={onSubmit} />
    </FormProvider>
  );
}
