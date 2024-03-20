import { styled } from "@mui/system";

export const SigninWrapper = styled("div")(() => ({
  background: "url(/restaurant.jpg)",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const SigninContent = styled("div")(() => ({
  display: "grid",
  gridTemplateRows: "150px 1fr",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
}));

export const SigninTop = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-end",
  padding: "16px",
  justifyContent: "space-between",
  h1: {
    font: "800 36px Inter, sans-serif",
    color: "#ffffff",
    margin: 0,
    lineHeight: "32px",
  },
}));

export const SigninBottom = styled("div")(() => ({
  background: "white",
  borderRadius: "16px 16px 0 0",
  padding: "16px",
}));

export const SigninForm = styled("div")(() => ({
  display: "grid",
  gap: "24px",
  ".signinTop": {
    display: "grid",
    h3: {
      font: "700 20px Inter, sans-serif",
      lineHeight: "28px",
      margin: 0,
    },
    p: {
      font: "400 12px Inter, sans-serif",
      lineHeight: "16px",
    },
  },
  form: {
    display: "grid",
    gap: "24px",
  },
}));
