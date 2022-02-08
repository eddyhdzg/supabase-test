import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateIngredientSchema,
  updateIngredientDefaultValues,
} from "./useUpdateIngredientForm.schema";

export default function useUpdateIngredientForm() {
  const form = useForm({
    resolver: yupResolver(updateIngredientSchema),
    mode: "onChange",
    defaultValues: updateIngredientDefaultValues,
  });

  return form;
}
