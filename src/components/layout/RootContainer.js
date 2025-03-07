import { styled } from "@mui/system";

const RootContainer = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  paddingTop: "64px",
  background: "radial-gradient(ellipse at 50% 50%, hsl(210, 36%, 92%), hsl(0, 40%, 94%))",
  overflowY: "auto", // Enables scrolling when content exceeds viewport height
  transition: "all 0.3s ease-in-out",

  [theme.breakpoints.down("md")]: {
    padding: "10px", // Adjusts spacing for smaller screens
    paddingTop: "50px",
  },
}));

export default RootContainer;
