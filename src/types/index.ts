export * from "./store.types";
export * from "./router.types";
export interface Todo {
  id?: string;
  user_id?: string;
  task?: string;
  is_complete?: boolean;
  inserted_at?: any;
}

export interface Client {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  street?: string;
  zipCode?: string;
  state?: string;
  phoneNumber?: string;
  birthDate?: string; // FIXME
  planId?: string;
  lateActivation?: boolean;
  customerSID?: string;
  subscriptionSID?: string;
  lastFour?: string;
  cardType?: string;
  suscriptionStatus?: any;
  creationDate?: any;
  cancelDate?: any;
  recipeID?: string;
  // Custom
  avatar?: string;
}
