import * as yup from "yup";
import { Unit } from "types";

export interface UpdateUnitSchema {
  unit: Unit["unit"];
}

export const updateUnitDefaultValues: UpdateUnitSchema = {
  unit: "",
};

export const updateUnitSchema: yup.SchemaOf<UpdateUnitSchema> = yup
  .object()
  .shape({
    unit: yup.string().default("").min(1).required("Value is required"),
  })
  .required();
