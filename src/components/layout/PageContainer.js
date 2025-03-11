// Updated PageContainer.js (Simplified)
import React from "react";
import { styled } from "@mui/system";

const StyledContainer = styled("div")({
  maxWidth: "1200px",
  width: "100%",
  margin: "0 auto",
  padding: "20px",
  background: "rgba(209, 202, 202, 0.8)",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  color: "rgba(0, 0, 0, 0.8)",
  minHeight: "100vh",
  marginTop: "100px",
});

export default function PageContainer({ children }) {
  return <StyledContainer>{children}</StyledContainer>;
}