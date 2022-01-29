import { useLocation } from "react-router-dom";
import { TBaseRoutes } from "types";
import shallow from "zustand/shallow";
import useRouterMemo from "./useRouterMemo";

export default function useMemoryRoute() {
  const { pathname } = useLocation();
  const { routerMemo } = useRouterMemo(
    ({ routerMemo }) => ({ routerMemo }),
    shallow
  );
  const getMemoryRoute = (baseRoute: TBaseRoutes) => {
    if (pathname.includes(baseRoute)) {
      return pathname.substring(0, pathname.lastIndexOf("/")) || baseRoute;
    }
    return routerMemo[baseRoute];
  };

  return getMemoryRoute;
}
