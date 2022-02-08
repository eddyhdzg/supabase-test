import * as yup from "yup";
import { Quantity } from "types";

export interface UpdateQuantitySchema {
  quantity: Quantity["quantity"];
}

export const updateQuantityDefaultValues: UpdateQuantitySchema = {
  quantity: 1,
};

export const updateQuantitySchema: yup.SchemaOf<UpdateQuantitySchema> = yup
  .object()
  .shape({
    quantity: yup
      .number()
      .default(1)
      .moreThan(0, "Can't be 0")
      .required("Value is required"),
  })
  .required();
