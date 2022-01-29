import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import { useUser, useLogin, useLogout } from "hooks";
import { HideOnScroll } from "components";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./Navbar.styled";

interface NavbarProps {
  open: boolean;
  onDrawerToggle: () => void;
}

export default function Navbar({ open, onDrawerToggle }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user } = useUser();
  const login = useLogin();
  const logout = useLogout();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              flexWrap: "wrap",
              justifyContent: {
                xxs: "space-between",
                xs: "unset",
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              size="large"
              sx={{
                mr: 2,
                order: "1",
                display: {
                  xxs: "none",
                  sm: "inline-flex",
                },
              }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Search
              sx={{
                flex: {
                  xxs: "1",
                  xs: "unset",
                },
                flexBasis: {
                  xxs: "100%",
                  xs: "unset",
                },
                order: {
                  xxs: "3",
                  xs: "2",
                },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              size="large"
              sx={{
                display: "flex",
                order: {
                  xxs: "2",
                  xs: "3",
                },
                ml: {
                  xxs: "auto",
                },
              }}
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {user ? (
          <>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
            >
              <LogoutIcon
                sx={{
                  mr: 2,
                }}
              />
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                login("google");
              }}
            >
              <GoogleIcon
                sx={{
                  mr: 2,
                }}
              />
              Sign in with Google
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                login("github");
              }}
            >
              <GitHubIcon
                sx={{
                  mr: 2,
                }}
              />
              Sign in with Github
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
