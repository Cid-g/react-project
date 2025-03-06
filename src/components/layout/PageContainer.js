import React from "react";
import { styled } from "@mui/system";

const StyledContainer = styled("div")({
  maxWidth: "1200px", // Adjust based on your design
  width: "100%",
  margin: "0 auto", // Centers content horizontally
  padding: "20px",
  background: "rgba(209, 202, 202, 0.8)", // Dark semi-transparent background
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow effect
  color: "rgba(0, 0, 0, 0.8)", // Light text for contrast
  minHeight: "100vh",
  marginTop: "40px",
});

function PageContainer({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}

export default PageContainer;
