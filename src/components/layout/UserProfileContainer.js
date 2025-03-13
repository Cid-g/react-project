import React from "react";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";

const ProfileContainer = styled(Box)(({ theme }) => ({
  width: "50vw", // Takes up half of the viewport width
  minHeight: "100%", // Automatically adjusts to content
  background: "linear-gradient(135deg, #e2e2f3, #8ba3d4)",
  color: "#000",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  padding: "20px",
  borderRadius: "8px", // Subtle rounding for modern feel
  position: "relative", // Allows it to be placed properly inside its parent
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "flex-start",
  overflow: "hidden", // Prevents unwanted scrollbars
  transition: "all 0.3s ease-in-out",

  [theme.breakpoints.down("md")]: {
    width: "100vw", // Full width on smaller screens
    minHeight: "auto", // Allows shrinking on smaller devices
  },
}));

function UserProfileContainer({ children }) {
  return <ProfileContainer>{children}</ProfileContainer>;
}

export default UserProfileContainer;
