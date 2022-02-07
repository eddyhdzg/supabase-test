import {
  StyledAppBar,
  StyledBottomNavigation,
  StyledBottomNavigationAction,
} from "./MobileAppbar.styled";
import { useRouterTree, useMemoryRoute } from "hooks";
import { NavLink, useLocation } from "react-router-dom";
import { TBaseRoutes } from "types";

export default function MobileAppbar() {
  const routerTree = useRouterTree();
  const memoryRoute = useMemoryRoute();
  const { pathname } = useLocation();

  return (
    <StyledAppBar
      position="fixed"
      color="transparent"
      sx={{
        display: {
          sm: "none",
        },
      }}
    >
      <StyledBottomNavigation value={pathname}>
        {Object.entries(routerTree).map(([route, { Icon, title }]) => (
          <StyledBottomNavigationAction
            key={route}
            component={NavLink}
            to={memoryRoute(route as TBaseRoutes)}
            label={title}
            value={route}
            icon={
              <Icon
                sx={{
                  fontSize: {
                    xxs: "1.25rem",
                    xs: "1.5rem",
                  },
                }}
              />
            }
          />
        ))}
      </StyledBottomNavigation>
    </StyledAppBar>
  );
}
