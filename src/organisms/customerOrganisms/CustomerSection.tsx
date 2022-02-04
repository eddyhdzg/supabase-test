import { Typography, Box } from "@mui/material";
import { CustomerRow } from "types";

interface CustomerSectionProps {
  title: string;
  rows: CustomerRow[];
}

export default function CustomerSection({ title, rows }: CustomerSectionProps) {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box
        component="ul"
        sx={{
          overflowWrap: "break-word",
        }}
      >
        {rows.map(({ Icon, text, title }) => {
          return (
            <Box
              key={title}
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                  gutterBottom
                >
                  <Icon
                    sx={{
                      mr: 1.5,
                    }}
                    fontSize="small"
                  />
                  {title}
                </Typography>
              </Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  textAlign: "right",
                  overflow: "hidden",
                  ml: 1.5,
                }}
              >
                {text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
