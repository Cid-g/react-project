import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const InputField = ({ label, id, error, helpertext, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      fullWidth
      type={id === "password" && !showPassword ? "password" : "text"}
      label={label}
      error={error}
      helperText={helpertext}
      InputProps={
        id === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      {...props}
    />
  );
};

export default InputField;
