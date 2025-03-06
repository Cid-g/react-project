import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCoverPhoto = styled(Box)({
  width: "100%",
  height: "250px",
  background: "url('/cover-photo.jpg') center/cover no-repeat",
  position: "relative",
});

function CoverPhoto() {
  return <StyledCoverPhoto />;
}

export default CoverPhoto;
