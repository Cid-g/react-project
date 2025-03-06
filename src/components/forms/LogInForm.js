import React from "react";
import { Stack, FormControl, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "../ui/FormButton";
import InputField from "../ui/InputField";
import RootContainer from "../layout/RootContainer";
import CardWrapper from "../layout/CardWrapper";
import ForgotPasswordButton from "../ui/ForgotPasswordButton";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [userTypeError, setUserTypeError] = useState(false);
  const [userTypeErrorMessage, setUserTypeErrorMessage] = useState("");

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs before making an API call
    if (!validateInputs()) {
      console.log("Validation failed. Fix the errors and try again.");
      return;
    }

    try {
      console.log("Attempting login with:", { email, password, userType });

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
        });

        if (!data.user || !data.user.userType) {
          console.error("User type is missing from API response!", data);
          toast.error("Login failed: user type missing from server.", {
            position: "top-right",
            autoClose: 2000,
          });
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.user.userType);
        console.log("Stored userType in localStorage:", data.user.userType);

        if (data.user.userType.toLowerCase() === "admin") {
          console.log("Navigating to /admin");
          navigate("/admin");
        } else {
          console.log("Navigating to /user");
          navigate("/user");
        }
      } else {
        console.error("Login failed:", data.message);
        toast.error(data.message );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong" , {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!userType) {
      setUserTypeError(true);
      setUserTypeErrorMessage("Please select a user type.");
      isValid = false;
    } else {
      setUserTypeError(false);
      setUserTypeErrorMessage("");
    }

    return isValid;
  };

  return (
    <RootContainer>
      <CardWrapper>
        <Stack spacing={4} component="form" onSubmit={handleLogin}>
          <Typography variant="h1" sx={{ fontSize: "clamp(2.5rem, 15vw, 3rem)" }}>
            Sign in
          </Typography>

          {/* Fixed User Type Select */}
          <FormControl error={userTypeError}>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              color={userTypeError ? "error" : "primary"}
              label="User Type"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
            {userTypeError && <FormHelperText>{userTypeErrorMessage}</FormHelperText>}
          </FormControl>

          <FormControl>
            <InputField
              label="Email"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? "error" : "primary"}
            />
          </FormControl>

          <FormControl>
            <InputField
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Button label="Log In" type="submit" />

          <ForgotPasswordButton onClick={() => navigate("/forgotpassword")} />

          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup" sx={{ cursor: "pointer", textDecoration: "none" }}>
              Signup
            </Link>
          </Typography>
        </Stack>
      </CardWrapper>
    </RootContainer>
  );
}

export default LoginForm;