import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { drawerWidth } from "constant";
import { NavLink, useLocation } from "react-router-dom";
import { DrawerHeader } from "./Drawer.styled";
import { useRouterTree, useMemoryRoute } from "hooks";
import { TBaseRoutes } from "types";

interface DrawerProps {
  open: boolean;
}

export default function Drawer({ open }: DrawerProps) {
  const routerTree = useRouterTree();
  const memoryRoute = useMemoryRoute();
  const { pathname } = useLocation();

  return (
    <MUIDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {Object.entries(routerTree).map(([route, { Icon, title }]) => (
          <ListItemButton
            key={route}
            component={NavLink}
            to={memoryRoute(route as TBaseRoutes)}
            selected={route === pathname}
          >
            <ListItemIcon
              sx={{
                ml: "env(safe-area-inset-left)",
              }}
            >
              {<Icon />}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        ))}
      </List>
    </MUIDrawer>
  );
}
