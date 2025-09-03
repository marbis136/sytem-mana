import { Typography } from "@mui/material";

export default function SectionTitle({ children, collapsed }) {
  if (collapsed) return null;
  return (
    <Typography
      variant="caption"
      sx={{
        px: 2, pt: 2, pb: 1,
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: 0.6
      }}
    >
      {children}
    </Typography>
  );
}
