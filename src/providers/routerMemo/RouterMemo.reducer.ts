import { Actions } from "./RouterMemo.actions";
import { RouterMemoState } from "./RouterMemo.initialState";

const reducer = (draft: RouterMemoState, action: Actions) => {
  switch (action.type) {
    case "ROUTERMEMO_UPDATE_MEMO":
      draft.routerMemo[action.payload.key] = action.payload.route;
      break;
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
