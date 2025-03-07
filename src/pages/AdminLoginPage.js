import React, { useState } from "react";
import { Stack, FormControl, Typography, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/FormButton";
import InputField from "../components/ui/InputField";
import RootContainer from "../components/layout/RootContainer";
import CardWrapper from "../components/layout/CardWrapper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonIcon from "@mui/icons-material/Person"; // Icon for username
import LockIcon from "@mui/icons-material/Lock"; // Icon for password
import { useUser } from "../context/UserContext";

function AdminLoginPage() {
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigate = useNavigate();
    const { login } = useUser(); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Validate inputs before making an API call
    if (!validateInputs()) {
      console.log("Validation failed. Fix the errors and try again.");
      return;
    }
  
    try {
      console.log("Attempting admin login with:", { username, password });
  
      const response = await fetch("http://localhost:5000/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (response.ok) {
        toast.success("Admin login successful!", {
          position: "top-right",
          autoClose: 2000,
        });
            // Call login with user data, access token, refresh token, and expiration time
            login(data.user, data.accessToken, data.refreshToken, data.expiresIn);
            
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "Admin");
        console.log("Stored userType in localStorage:", "Admin");
        login(data.user);
  
        navigate("/admin");
      } else {
        console.error("Admin login failed:", data.message);
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  
  const validateInputs = () => {
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      setUsernameError(true);
      setUsernameErrorMessage("Username is required.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <RootContainer>
      <CardWrapper>
        <Stack spacing={4} component="form" onSubmit={handleLogin}>
          <Typography variant="h1" sx={{ fontSize: "clamp(2.5rem, 15vw, 3rem)" }}>
            Admin Login
          </Typography>

      
          <FormControl>
            <InputField
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
              helperText={usernameErrorMessage}
              color={usernameError ? "error" : "primary"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>


          <FormControl>
            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

   
          <Button label="Log In" type="submit" />
        </Stack>
      </CardWrapper>
    </RootContainer>
  );
}

export default AdminLoginPage;