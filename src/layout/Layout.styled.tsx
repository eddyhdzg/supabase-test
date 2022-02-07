import { styled } from "@mui/material/styles";
import { drawerWidth } from "constant";

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "hasBottomSearch",
})<{
  open?: boolean;
  hasBottomSearch?: boolean;
}>(({ theme, open, hasBottomSearch }) => ({
  minHeight: "100vh",
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  paddingTop: hasBottomSearch ? theme.spacing(9) : theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("xs")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  [theme.breakpoints.up("sm")]: {
    paddingBottom: theme.spacing(3),
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
