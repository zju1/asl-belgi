import { styled } from "@mui/material";

export const CWWRapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "50px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "0 16px 0 0",
  position: "relative",
  background: theme.palette.background.paper,
}));

export const CWTitle = styled("h4")(() => ({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "18px",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "50%",
  font: "600 14px Inter, sans-serif",
}));

export const PageContent = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  height: window.innerHeight - 60,
  position: "relative",
  overflow: "auto",
  paddingBottom: "120px",
}));
