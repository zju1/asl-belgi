import { styled } from "@mui/material";

export const AIWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  background: theme.palette.background.paper,
  padding: "12px",
  borderRadius: "3px",
  display: "grid",
  gap: "12px",
  div: {
    display: "grid",
    gap: "5px",
  },
  h5: {
    font: "500 14px Inter, sans-serif",
  },
  p: {
    font: "400 14px Inter, sans-serif",
  },
}));
