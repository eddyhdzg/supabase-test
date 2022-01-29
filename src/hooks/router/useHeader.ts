import shallow from "zustand/shallow";
import { useStore } from "hooks";
import { BackButton } from "types";

export default function useHeader() {
  const { dispatch } = useStore(({ dispatch }) => ({ dispatch }), shallow);

  const onChangeRoute = (backButton: BackButton) => {
    dispatch({ type: "BACKBUTTON_CHANGE_DATA", payload: backButton });
  };

  return { onChangeRoute };
}
