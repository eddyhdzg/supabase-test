import { styled, InputBase, inputBaseClasses, alpha } from "@mui/material";

const NakedInput = styled(InputBase)(
  ({ theme }) =>
    ({ disabled }: { disabled?: boolean }) => ({
      borderLeftColor: alpha(theme.palette.common.white, 0.15),
      borderRightColor: alpha(theme.palette.common.white, 0.15),
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderLeftWidth: "1px",
      borderRightWidth: "1px",
      maxWidth: theme.spacing(8),
      [`& .${inputBaseClasses.input}`]: {
        textAlign: "center",
        pointerEvents: disabled ? "none" : undefined,
      },
    })
);

export default NakedInput;
