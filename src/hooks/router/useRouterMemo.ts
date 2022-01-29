import produce, { Draft } from "immer";
import create, { State, StateCreator } from "zustand";
import { Actions } from "providers/routerMemo/RouterMemo.actions";
import { RouterMemoDispatch } from "providers/routerMemo/RouterMemo.dispatch";
import {
  RouterMemoState,
  initialRouterMemoState,
} from "providers/routerMemo/RouterMemo.initialState";
import reducer from "providers/routerMemo/RouterMemo.reducer";

const immer =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce(fn) as (state: T) => T), get, api);

const useRouterMemo = create<RouterMemoState & RouterMemoDispatch>(
  immer((set) => ({
    ...initialRouterMemoState,
    dispatch: (args: Actions) => set((state) => reducer(state, args)),
  }))
);

export default useRouterMemo;
