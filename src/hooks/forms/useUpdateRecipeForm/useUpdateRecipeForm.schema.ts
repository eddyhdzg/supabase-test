import * as yup from "yup";
import { Recipe } from "types";

export interface UpdateRecipeSchema extends Omit<Recipe, "id"> {}

export const updateRecipeDefaultValues: UpdateRecipeSchema = {
  calories: 0,
  description: "",
  name: "",
  url: "",
  time: 0,
};

export const updateRecipeSchema: yup.SchemaOf<UpdateRecipeSchema> = yup
  .object()
  .shape({
    calories: yup.number().default(0).min(0).required("Value is required"),
    description: yup.string().default("").min(1).required("Value is required"),
    name: yup.string().default("").min(1).required("Value is required"),
    url: yup.string().default("").min(1).required("Value is required"),
    time: yup.number().default(0).min(0).required("Value is required"),
  })
  .required();
