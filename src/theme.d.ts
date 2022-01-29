import * as React from "react";
import {
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  PaletteMode,
} from "@mui/material";

export type ThemeType = PaletteMode | "system";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      glassBackground: {
        backgroundColor: string;
        backdropFilter: string;
      };
      elevation: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        6: string;
        8: string;
        12: string;
        16: string;
        24: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      glassBackground?: {
        backgroundColor?: string;
        backdropFilter?: string;
      };
      elevation?: {
        1?: string;
        2?: string;
        3?: string;
        4?: string;
        6?: string;
        8?: string;
        12?: string;
        16?: string;
        24?: string;
      };
    };
  }

  interface BreakpointOverrides {
    xxs: true;
  }
}
