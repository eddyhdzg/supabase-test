import { useEffect } from "react";
import {
  useUpdateQuantityForm,
  useUpdateQuantity,
  UpdateQuantitySchema,
  updateQuantityDefaultValues,
} from "hooks";
import { FormProvider } from "react-hook-form";
import { Quantity } from "types";
import UpdateQuantityFormLayout from "./UpdateQuantityFormLayout";

export default function UpdateQuantityForm({ id = "", quantity }: Quantity) {
  const { reset, ...form } = useUpdateQuantityForm();
  const updateQuantity = useUpdateQuantity(reset);

  useEffect(() => {
    const defaultValues: UpdateQuantitySchema =
      quantity !== undefined ? { quantity } : updateQuantityDefaultValues;
    reset(defaultValues);
  }, [reset, quantity]);

  const onSubmit = (newQuantity: Quantity["quantity"]) => {
    if (quantity !== newQuantity) {
      updateQuantity.mutate({ id, quantity: newQuantity });
    }
  };

  return (
    <FormProvider reset={reset} {...form}>
      <UpdateQuantityFormLayout onSubmit={onSubmit} id={id} />
    </FormProvider>
  );
}
