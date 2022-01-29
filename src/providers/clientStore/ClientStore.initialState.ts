import { BackButton } from "types";

export type ClientState = {
  backButton: BackButton;
};

export const initialClientState: ClientState = {
  backButton: {
    text: undefined,
    url: undefined,
  },
};
