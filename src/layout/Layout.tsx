import { Notch } from "components";
import { useState, useEffect } from "react";
import { useBreakpoint } from "hooks";
import { Header, MobileAppbar, Drawer } from "components";
import { Main, DrawerHeader } from "./Layout.styled";
import { Box } from "@mui/material";

const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const sm = useBreakpoint("sm");

  useEffect(() => {
    if (open && !sm) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Notch />
      <Header open={open} onDrawerToggle={handleDrawerToggle} />
      <MobileAppbar />
      <Drawer open={open} />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;
