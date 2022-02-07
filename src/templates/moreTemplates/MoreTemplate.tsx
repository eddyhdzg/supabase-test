import { Box, Typography } from "@mui/material";
import { SectionLink } from "components";

export default function MoreTemplate() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        More
      </Typography>

      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: 2,
          }}
        >
          <SectionLink to="/more/quantities">
            <Typography variant="h4" gutterBottom>
              🔢
            </Typography>
            <Typography variant="h6" gutterBottom>
              Quantities
            </Typography>
          </SectionLink>
          <SectionLink to="/more/units">
            <Typography variant="h4" gutterBottom>
              📏
            </Typography>
            <Typography variant="h6" gutterBottom>
              Units
            </Typography>
          </SectionLink>
        </Box>
      </div>
    </>
  );
}
