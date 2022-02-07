import { Paper, ButtonBase, ButtonBaseProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

interface SectionLinkProps extends ButtonBaseProps, Pick<LinkProps, "to"> {}

export default function SectionLink(props: SectionLinkProps) {
  const { children, ...other } = props;
  return (
    <ButtonBase LinkComponent={Link} {...other}>
      <Paper
        sx={{
          p: 2,
          fontWeight: "700",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        {children}
      </Paper>
    </ButtonBase>
  );
}
