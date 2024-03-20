import { CircularProgress, Stack, styled } from "@mui/material";

export const FormTitle = styled("h1")(() => ({
  font: "600 24px Inter, sans-serif",
  lineHeight: "36px",
}));

export const FormSubtitle = styled("p")(({ theme }) => ({
  font: "400 14px Inter, sans-serif",
  lineHeight: "21px",
  color: theme.palette.grey[500],
}));

export const PageTitle = styled("h1")(() => ({
  font: "800 24px Inter, sans-serif",
  color: "rgba(0,0,0,0.3)",
}));

export const SharedPaper = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: "10px",
}));

export const SearchItem = styled("div")(({ theme }) => ({
  position: "sticky",
  background: theme.palette.background.paper,
  padding: "10px 12px",
  top: 0,
  zIndex: 1,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  marginBottom: "10px",
  div: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    padding: "6px 12px",
    background: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "3px",
    alignItems: "center",
    color: theme.palette.grey[400],
    input: {
      background: "transparent",
      border: "none",
      outline: "none !important",
      padding: "3px",
      font: "500 14px Inter, sans-serif",
      "::placeholder": {
        color: theme.palette.grey[400],
      },
    },
  },
}));

export const SearchLoading = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "150px",
}));

export const TreeButton = styled("button")(() => ({
  background: "transparent",
  border: "none",
  width: "36px",
  height: "20px",
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const DFFooter = styled("div")(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  padding: "12px 16px",
  display: "grid",
  borderTop: `1px solid ${theme.palette.grey[300]}`,
  [theme.breakpoints.down("md")]: {
    paddingBottom: 0,
  },
}));

export const InternetBanner = styled("div")(({ theme }) => ({
  paddingLeft: "250px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  font: "400 14px Inter, sans-serif",
  padding: "6px 12px 6px 262px",
  gap: "12px",
  zIndex: 9999,
  boxShadow: theme.shadows[1],
  position: "sticky",
  top: 0,
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const AccessWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  "h1,p": {
    textAlign: "center",
  },
  img: {
    maxWidth: "200px",
  },
  h1: {
    font: "700 20px Inter, sans-serif",
  },
  p: {
    font: "400 14px Inter, sans-serif",
  },
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "6px",
  },
}));

export const AbsoluteLoading = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor="rgba(255,255,255,.8)"
      sx={{
        zIndex: 1,
      }}
    >
      <CircularProgress />
    </Stack>
  );
};

export const ToolsList = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
}));

export const ToolsWithSearch = styled("div")(() => ({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  "& > div:first-child": {
    flex: 1,
  },
}));

export const LoadingOverlayWrapper = styled("div")(() => ({
  position: "relative",
  ".loadingContent": {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,.7)",
    zIndex: 1,
  },
}));

export const AppPage = styled("div")(({ theme }) => ({
  paddingBottom: "56px",
  background: theme.palette.background.default,
  display: "grid",
  gridTemplateRows: "auto 1fr",
}));

export const ListCard = styled(Stack)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: "20px",
  overflow: "hidden",
  border: `1px solid ${theme.palette.grey[200]}`,
  "&.transparent": {
    background: "transparent",
    borderRadius: "0px",
  },
}));
