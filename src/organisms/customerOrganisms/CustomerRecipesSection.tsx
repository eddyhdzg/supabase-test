import { Typography, Box } from "@mui/material";

interface CustomerSectionProps {
  title: string;
  recipes?: string[];
}

export default function CustomerRecipesSection({
  title,
  recipes,
}: CustomerSectionProps) {
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
        {recipes?.map((recipes, i) => {
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
              <Typography variant="subtitle2" gutterBottom>
                {i + 1} - {recipes}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
