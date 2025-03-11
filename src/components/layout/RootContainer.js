import React from "react";
import { Box } from "@mui/material";

function RootContainer({ children }) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {children}
    </Box>
  );
}

export default RootContainer;