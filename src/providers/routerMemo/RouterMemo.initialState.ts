import { TRouterMemo } from "types";

export type RouterMemoState = {
  routerMemo: TRouterMemo;
};

export const initialRouterMemoState: RouterMemoState = {
  routerMemo: {
    "/list": "/list",
    "/customers": "/customers",
    "/recipes": "/recipes",
    "/ingredients": "/ingredients",
  },
};
