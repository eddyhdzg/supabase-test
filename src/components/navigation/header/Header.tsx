import { useState } from "react";
import { Button } from "@mui/material";
import { Box, Toolbar, IconButton, MenuItem, Menu } from "@mui/material";
import { useUser, useLogin, useLogout, useStore } from "hooks";
import { Link } from "react-router-dom";
import { HideOnScroll } from "components";
import { Searchbar } from "components";
import shallow from "zustand/shallow";
import { AppBar } from "./Header.styled";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

interface HeaderProps {
  open: boolean;
  onDrawerToggle: () => void;
}

export default function Header({ open, onDrawerToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user } = useUser();
  const login = useLogin();
  const logout = useLogout();
  const { backButton } = useStore(
    ({ backButton }) => ({ backButton }),
    shallow
  );

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
              pt: "calc(8px + env(safe-area-inset-top))",
              pb: 1,
              flexWrap: "wrap",
              justifyContent: {
                xxs: "space-between",
              },
            }}
          >
            <Box
              sx={{
                order: {
                  xxs: 1,
                },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                size="large"
                sx={{
                  mr: 1,
                  display: {
                    xxs: "none",
                    xs: "inline-flex",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              {backButton.text && backButton.url && (
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  component={Link}
                  to={backButton.url}
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {backButton.text}
                </Button>
              )}
            </Box>

            <Box
              sx={{
                order: {
                  xxs: 3,
                  xs: 2,
                },
                width: {
                  xxs: "100%",
                  xs: "unset",
                },
                ml: {
                  xs: "auto",
                },
                mr: {
                  xs: 2,
                },
              }}
            >
              <Searchbar />
            </Box>

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
                  xxs: 2,
                  xs: 3,
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
        ) : (
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
        )}
      </Menu>
    </>
  );
}
