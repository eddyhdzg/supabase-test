import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type ISOString = string;

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

export interface CustomerOrder {
  // Primary Data
  // city?: string;
  // country?: string;
  // email?: string;
  // firstName?: string;
  // lastName?: string;
  // phoneNumber?: number;
  // state?: string;
  // street?: string;
  // zipCode?: number;
  // subscriptionStatus?: "ACTIVE" | string;
  // Customer Data
  // customerId?: string;
  // _id?: string;
  // _owner?: string;
  // subscriptionId?: string;
  // Dates
  // birthDate?: ISOString;
  // _createdDate?: ISOString;
  // _updatedDate?: ISOString;
  // Payment Method
  // cardType?: string;
  // lastFour?: number;
  // Plan
  // lateActivation?: boolean;
  // lateSat?: ISOString;
  // numPortions?: number;
  // numRecipes?: number;
  // planId?: string;
  // planName?: string;
  // recipes?: string[];
}
