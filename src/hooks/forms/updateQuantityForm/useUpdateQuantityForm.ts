import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateQuantitySchema,
  updateQuantityDefaultValues,
} from "./useUpdateQuantityForm.schema";

export default function useUpdateQuantityForm() {
  const form = useForm({
    resolver: yupResolver(updateQuantitySchema),
    mode: "onChange",
    defaultValues: updateQuantityDefaultValues,
  });

  return form;
}
