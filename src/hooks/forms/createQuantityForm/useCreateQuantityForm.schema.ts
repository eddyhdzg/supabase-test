import * as yup from "yup";
import { Quantity } from "types";

export interface CreateQuantitySchema {
  quantity: Quantity["quantity"];
}

export const createQuantityDefaultValues: CreateQuantitySchema = {
  quantity: 1,
};

export const createQuantitySchema: yup.SchemaOf<CreateQuantitySchema> = yup
  .object()
  .shape({
    quantity: yup
      .number()
      .default(1)
      .moreThan(0, "Can't be 0")
      .required("Value is required"),
  })
  .required();
