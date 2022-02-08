import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateUnitSchema,
  updateUnitDefaultValues,
} from "./useUpdateUnitForm.schema";

export default function useUpdateUnitForm() {
  const form = useForm({
    resolver: yupResolver(updateUnitSchema),
    mode: "onChange",
    defaultValues: updateUnitDefaultValues,
  });

  return form;
}
