import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { links, drawerWidth } from "constant";
import { Link } from "react-router-dom";
import { DrawerHeader } from "./Drawer.styled";

interface DrawerProps {
  open: boolean;
}

export default function Drawer({ open }: DrawerProps) {
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
        {links.map((link) => (
          <ListItem button key={link.route} component={Link} to={link.href}>
            <ListItemIcon>{<link.Icon />}</ListItemIcon>
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </MUIDrawer>
  );
}
