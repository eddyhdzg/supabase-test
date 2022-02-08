import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createIngredientSchema,
  createIngredientDefaultValues,
} from "./useCreateIngredientForm.schema";

export default function useCreateIngredientForm() {
  const form = useForm({
    resolver: yupResolver(createIngredientSchema),
    mode: "onChange",
    defaultValues: createIngredientDefaultValues,
  });

  return form;
}
