import { useCreateUnitForm, useCreateUnit } from "hooks";
import { FormProvider } from "react-hook-form";
import CreateUnitFormLayout from "./CreateUnitFormLayout";

export default function CreateUnitForm() {
  const form = useCreateUnitForm();
  const createUnit = useCreateUnit(form.reset);

  const onSubmit = form.handleSubmit((values, e) => {
    e?.preventDefault();
    createUnit.mutate({ unit: values.unit });
  });

  return (
    <FormProvider {...form}>
      <CreateUnitFormLayout onSubmit={onSubmit} />
    </FormProvider>
  );
}
