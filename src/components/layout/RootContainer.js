import { styled } from "@mui/system";

const RootContainer = styled("div")({
  minHeight: "100vh",
  padding: "16px",
  paddingTop: "64px",
  display: "flex",
  flexDirection: "column",
  background: "radial-gradient(ellipse at 50% 50%, hsl(210, 36.80%, 92.50%), hsl(0, 40.70%, 94.70%))",
  overflowY: "auto", // Allow vertical scrolling if content overflows
});

export default RootContainer;
