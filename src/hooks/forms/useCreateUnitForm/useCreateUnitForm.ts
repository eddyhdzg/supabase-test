import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUnitSchema,
  createUnitDefaultValues,
} from "./useCreateUnitForm.schema";

export default function useCreateUnitForm() {
  const form = useForm({
    resolver: yupResolver(createUnitSchema),
    mode: "onChange",
    defaultValues: createUnitDefaultValues,
  });

  return form;
}
