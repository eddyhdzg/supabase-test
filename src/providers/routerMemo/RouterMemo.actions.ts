import { TBaseRoutes } from "types";

export interface RouterMemoUpdateMemo {
  type: "ROUTERMEMO_UPDATE_MEMO";
  payload: { key: TBaseRoutes; route: string };
}

export type Actions = RouterMemoUpdateMemo;
