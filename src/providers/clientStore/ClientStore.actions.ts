import { BackButton } from "types";

export interface BackButton_Change_Data {
  type: "BACKBUTTON_CHANGE_DATA";
  payload: BackButton;
}

export interface Customers_Change_Input {
  type: "CUSTOMERS_CHANGE_INPUT";
  payload: string;
}

export type Actions = BackButton_Change_Data | Customers_Change_Input;
