import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";
import { iOS, isPWA } from "../lib/utils/mini-utils";

const paddingBottom = iOS() && isPWA() ? "15px" : "5px";

export const TabsList = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  background: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

export const TabItem = styled(NavLink)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: theme.palette.grey[400],
  textDecoration: "none",
  font: "600 11px Inter, sans-serif",
  paddingTop: "5px",
  paddingBottom,
  WebkitTapHighlightColor: "transparent",
  ":active": {
    background: theme.palette.grey[100],
  },
  "&.active": {
    color: theme.palette.primary.main,
  },
  ".tabIcon": {
    fontSize: "34px",
    lineHeight: "30px",
  },
}));

export const PageWrapper = styled("div")(() => ({}));
