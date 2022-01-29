import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouterMemo } from "hooks";
import shallow from "zustand/shallow";
import { TBaseRoutes } from "types";

const RouterMemo: React.FC = ({ children }) => {
  const location = useLocation();
  const { dispatch, routerMemo } = useRouterMemo(
    ({ dispatch, routerMemo }) => ({ dispatch, routerMemo }),
    shallow
  );

  useEffect(() => {
    const baseRoute = (location.pathname.substring(
      0,
      location.pathname.indexOf("/", 1)
    ) || location.pathname) as TBaseRoutes;

    if (baseRoute in routerMemo) {
      dispatch({
        type: "ROUTERMEMO_UPDATE_MEMO",
        payload: { key: baseRoute, route: location.pathname + location.search },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <>{children}</>;
};

export default RouterMemo;
