import React from "react";
import { styled } from "@mui/system";
import MuiCard from "@mui/material/Card";

const StyledCard = styled(MuiCard)({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start", 
  width: "100%",
  padding: "32px",
  background: "rgba(221, 211, 211, 0.8)",
  gap: "16px",
  margin: "0 auto", // Center horizontally but keep it at the top
  maxWidth: "350px",
  borderRadius: "10px",

  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  position: "relative", // Adjust position if needed
  top: "64px", // Moves it to the top
  overflow: "visible", // Ensure content is not clipped
});

function CardWrapper({ children, login = "0px" }) {
  return <StyledCard>{children}</StyledCard>;
}

export default CardWrapper;