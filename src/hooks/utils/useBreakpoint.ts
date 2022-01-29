import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export default function useBreakpoint(breakpoint: Breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}
