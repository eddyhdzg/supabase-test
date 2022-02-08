import * as yup from "yup";
import { Ingredient } from "types";

export interface CreateIngredientSchema {
  ingredient: Ingredient["ingredient"];
}

export const createIngredientDefaultValues: CreateIngredientSchema = {
  ingredient: "",
};

export const createIngredientSchema: yup.SchemaOf<CreateIngredientSchema> = yup
  .object()
  .shape({
    ingredient: yup.string().default("").min(1).required("Value is required"),
  })
  .required();
