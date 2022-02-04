import { BackButton } from "types";

export type ClientState = {
  backButton: BackButton;
  customers: string;
};

export const initialClientState: ClientState = {
  backButton: {
    text: undefined,
    url: undefined,
  },
  customers: "",
};
