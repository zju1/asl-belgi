import { alpha, styled } from "@mui/material";

export const LIWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "16px",
  cursor: "pointer",
  ":not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  WebkitTapHighlightColor: "transparent",
  ":active": {
    background: alpha(theme.palette.grey[200], 0.5),
  },
}));

export const LIContent = styled("div")(({ theme }) => ({
  flex: 1,
  display: "grid",
  alignItems: "center",
  alignContent: "center",
  gap: "12px",
  cursor: "pointer",
  userSelect: "none",
  gridTemplateColumns: "30px 1fr",
  "& .icon": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "&.withNode": {
    gridTemplateColumns: "auto 1fr",
  },
  "& .subTitle": {
    fontWeight: "400",
    color: theme.palette.grey[500],
    font: "400 12px Inter, sans-serif",
    marginTop: "3px",
  },
  "& .title": {
    fontWeight: "500",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Roboto",
  },
}));
