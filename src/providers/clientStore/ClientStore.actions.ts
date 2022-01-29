import { BackButton } from "types";

export interface BackButton_Change_Data {
  type: "BACKBUTTON_CHANGE_DATA";
  payload: BackButton;
}

export type Actions = BackButton_Change_Data;
