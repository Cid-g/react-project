import React from "react";
import { Button } from "@mui/material";

function FormsButton({ label, onClick, type }) {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        bgcolor: "rgba(20, 20, 20, 0.9)",
        color: "white",
        "&:hover": { bgcolor: "rgba(61, 60, 60, 0.9)" },
        py: 1.5,
        borderRadius: 2,
        fontSize: "1rem",
        fontWeight: "bold",
      }}
      type={type}  // ✅ Ensures it works inside forms
      onClick={onClick}  // ✅ Passes the event properly
    >
      {label}
    </Button>
  );
}

export default FormsButton;
