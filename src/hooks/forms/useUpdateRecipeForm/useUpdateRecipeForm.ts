import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateRecipeSchema,
  updateRecipeDefaultValues,
} from "./useUpdateRecipeForm.schema";

export default function useUpdateRecipeForm() {
  const form = useForm({
    resolver: yupResolver(updateRecipeSchema),
    mode: "onChange",
    defaultValues: updateRecipeDefaultValues,
  });

  return form;
}
