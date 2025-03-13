import React from "react";
import { styled } from "@mui/system";
import MuiCard from "@mui/material/Card";

const StyledCard = styled(MuiCard)(({ maxWidth, top }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "flex-start", 
  width: "100%",
  padding: "32px",
  background: "rgba(247, 238, 238, 0.8)",
  gap: "16px",
  margin: "0 auto",
  maxWidth: maxWidth || "600px", 
  borderRadius: "10px",
  boxShadow:
    "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.5) 0px 15px 35px -5px",
  position: "relative",
  top: top|| "64px",
  overflow: "visible",
}));

function CardWrapper({ children, maxWidth, top }) {
  return <StyledCard maxWidth={maxWidth} top={top}>{children}</StyledCard>;
}

export default CardWrapper;
