import * as yup from "yup";
import { Ingredient } from "types";

export interface UpdateIngredientSchema {
  ingredient: Ingredient["ingredient"];
}

export const updateIngredientDefaultValues: UpdateIngredientSchema = {
  ingredient: "",
};

export const updateIngredientSchema: yup.SchemaOf<UpdateIngredientSchema> = yup
  .object()
  .shape({
    ingredient: yup.string().default("").min(1).required("Value is required"),
  })
  .required();
