import { useEffect } from "react";
import {
  useUpdateUnitForm,
  useUpdateUnit,
  UpdateUnitSchema,
  updateUnitDefaultValues,
} from "hooks";
import { FormProvider } from "react-hook-form";
import { Unit } from "types";
import UpdateUnitFormLayout from "./UpdateUnitFormLayout";

export default function UpdateUnitForm({ id = "", unit }: Unit) {
  const { reset, ...form } = useUpdateUnitForm();
  const updateUnit = useUpdateUnit(reset);

  useEffect(() => {
    const defaultValues: UpdateUnitSchema = unit
      ? { unit }
      : updateUnitDefaultValues;
    reset(defaultValues);
  }, [reset, unit]);

  const onSubmit = (newUnit: Unit["unit"]) => {
    if (unit !== newUnit) {
      updateUnit.mutate({ id, unit: newUnit });
    }
  };

  return (
    <FormProvider reset={reset} {...form}>
      <UpdateUnitFormLayout onSubmit={onSubmit} id={id} />
    </FormProvider>
  );
}
