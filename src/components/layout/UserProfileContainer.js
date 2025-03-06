import React from "react";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";
const ProfileContainer = styled(Box)({
  width: "50vw", // Occupies half the screen width
  height: "132.6vh", // Full height of the page
  background: "linear-gradient(135deg,rgb(226, 226, 243),rgb(137, 163, 212))",
  color: "#000",
  borderRadius: "0", // Remove rounded edges
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  overflow: "visible",
  paddingBottom: "30px",
  position: "absolute",
  left: "0", // No margin on the side
  top: "0", // Aligns at the top
  display: "flex",
  flexDirection: "column",
  paddingTop: "85px",
});
function UserProfileContainer({children}) {

  return (
    <ProfileContainer>{children}</ProfileContainer>
  );
}

export default UserProfileContainer;
