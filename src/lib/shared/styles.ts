import { styled } from "@mui/material";

export const Imagewrapper = styled("div")(({ theme }) => ({
  height: "250px",
  width: "100%",
  background: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: "5px",
  borderRadius: "5px",
  overflow: "hidden",
  img: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
}));
