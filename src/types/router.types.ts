export type TBaseRoutes =
  // | "/list"
  "/customers" | "/recipes" | "/ingredients" | "/more";
export type TRouterMemo = { [key in TBaseRoutes]: string };
// export type Routes = "list" | "customers" | "recipes" | "ingredients" | "more";
export type Routes = "customers" | "recipes" | "ingredients" | "more";
