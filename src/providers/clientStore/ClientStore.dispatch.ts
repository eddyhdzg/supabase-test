import { Actions } from "./ClientStore.actions";

export type ClientDispatch = {
  dispatch: (action: Actions) => void;
};
