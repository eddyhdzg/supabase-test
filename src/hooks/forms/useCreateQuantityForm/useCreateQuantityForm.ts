import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createQuantitySchema,
  createQuantityDefaultValues,
} from "./useCreateQuantityForm.schema";

export default function useCreateQuantityForm() {
  const form = useForm({
    resolver: yupResolver(createQuantitySchema),
    mode: "onChange",
    defaultValues: createQuantityDefaultValues,
  });

  return form;
}
