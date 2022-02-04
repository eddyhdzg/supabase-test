import { styled, alpha } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { InputBase, inputBaseClasses } from "@mui/material";
import { drawerWidth } from "constant";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  paddingTop: "env(safe-area-inset-top)",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  "&:focus-within": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginTop: theme.spacing(0.5),
  [theme.breakpoints.up("xs")]: {
    marginTop: 0,
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  [`& .${inputBaseClasses.input}`]: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "14ch",
    },
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
