import { useCreateQuantityForm, useCreateQuantity } from "hooks";
import { FormProvider } from "react-hook-form";
import CreateQuantityFormLayout from "./CreateQuantityFormLayout";

export default function CreateQuantityForm() {
  const form = useCreateQuantityForm();
  const createQuantity = useCreateQuantity();

  const onSubmit = form.handleSubmit((values, e) => {
    e?.preventDefault();
    createQuantity.mutate({ quantity: values.quantity });
  });

  return (
    <FormProvider {...form}>
      <CreateQuantityFormLayout onSubmit={onSubmit} />
    </FormProvider>
  );
}
