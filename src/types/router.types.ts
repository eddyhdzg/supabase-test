export type TBaseRoutes = "/list" | "/customers" | "/recipes" | "/ingredients";
export type TRouterMemo = { [key in TBaseRoutes]: string };
export type Routes = "list" | "customers" | "recipes" | "ingredients";
