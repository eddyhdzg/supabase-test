import * as yup from "yup";
import { Unit } from "types";

export interface CreateUnitSchema {
  unit: Unit["unit"];
}

export const createUnitDefaultValues: CreateUnitSchema = {
  unit: "",
};

export const createUnitSchema: yup.SchemaOf<CreateUnitSchema> = yup
  .object()
  .shape({
    unit: yup.string().default("").min(1).required("Value is required"),
  })
  .required();
