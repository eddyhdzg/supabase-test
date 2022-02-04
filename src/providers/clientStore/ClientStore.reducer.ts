import { Actions } from "./ClientStore.actions";
import { ClientState } from "./ClientStore.initialState";

const reducer = (draft: ClientState, action: Actions) => {
  switch (action.type) {
    case "BACKBUTTON_CHANGE_DATA":
      draft.backButton = action.payload;
      break;
    case "CUSTOMERS_CHANGE_INPUT":
      draft.customers = action.payload;
      break;
    default:
      throw new Error("Invalid action type");
  }
};

export default reducer;
