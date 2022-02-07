import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type ISOString = string;

// FIXME
export interface Todo {
  id?: string;
  user_id?: string;
  task?: string;
  is_complete?: boolean;
  inserted_at?: any;
}

export interface Customer {
  birthDate?: ISOString;
  cardType?: string;
  city?: string;
  country?: string;
  customerId?: string;
  email?: string;
  firstName?: string;
  lastFour?: number;
  lastName?: string;
  lateActivation?: boolean;
  lateSat?: ISOString;
  numPortions?: number;
  numRecipes?: number;
  phoneNumber?: number;
  planId?: string;
  planName?: string;
  recipes?: string[];
  state?: string;
  street?: string;
  subscriptionId?: string;
  subscriptionStatus?: "ACTIVE" | string;
  zipCode?: number;
  _createdDate?: ISOString;
  _id?: string;
  _owner?: string;
  _updatedDate?: ISOString;
}

export interface CustomerRow {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title: string | undefined;
  text: string | undefined;
}

export interface Quantity {
  id?: string;
  quantity?: number;
}

export interface QuantityRowData {
  id?: string;
  quantity?: number;
  usedIn?: string;
}
