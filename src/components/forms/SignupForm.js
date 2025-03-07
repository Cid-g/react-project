import React, { useState } from "react";
import { Stack, Typography, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import CardWrapper from "../layout/CardWrapper";
import RootContainer from "../layout/RootContainer";
import InputField from "../ui/InputField";
import FormsButton from "../ui/FormButton";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROLES } from "../../constants";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [userTypeError, setUserTypeError] = useState(false);
  const [userTypeErrorMessage, setUserTypeErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    let passwordErrors = [];
    let confirmPasswordErrorMsg = "";

    // Reset error states before validation
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage([]);
    setConfirmPasswordErrorMessage("");
    setUserTypeError(false);
    setUserTypeErrorMessage("");

    // Full Name validation
    if (!firstname.trim() && !middlename.trim() && lastname.trim()) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    }

    // Email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      passwordErrors.push("⚠️ Password is required.");
    } else {
      if (password.length < 6) passwordErrors.push("⚠️ At least 6 characters required.");
      if (!/[a-z]/.test(password)) passwordErrors.push("⚠️ Include one lowercase letter.");
      if (!/[A-Z]/.test(password)) passwordErrors.push("⚠️ Include one uppercase letter.");
      if (!/[0-9]/.test(password)) passwordErrors.push("⚠️ Include one number.");
      if (!/[!@#$%^&*]/.test(password)) passwordErrors.push("⚠️ Include one special character.");
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      confirmPasswordErrorMsg = "⚠️ Passwords do not match.";
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage(confirmPasswordErrorMsg);
      isValid = false;
    }

    if (passwordErrors.length > 0) {
      setPasswordError(true);
      setPasswordErrorMessage(passwordErrors);
      isValid = false;
    }

    if (!userType) {
      setUserTypeError(true);
      setUserTypeErrorMessage("⚠️ User Type is required.");
      isValid = false;
    }

    if (!isValid) {
      console.log("Validation failed.");
      return;
    }

    try {
      console.log("Sending signup request to:", "http://localhost:5000/api/auth/signup");
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstname,
          middleName: middlename,
          lastName: lastname,
          userType,
          email,
          password,
        }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        console.log("Signup successful:", data);
        toast.success("Sign up successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/login");
      } else {
        console.error("Signup failed:", data.message);
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

  return (
    <RootContainer>
      <CardWrapper>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Typography variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
              Sign up
            </Typography>

            
            <FormControl error={userTypeError}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                User Type
              </Typography>
              <RadioGroup
                row
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <FormControlLabel value={ROLES.TEACHER} control={<Radio />} label="Teacher" />
                <FormControlLabel value={ROLES.STUDENT} control={<Radio />} label="Student" />
              </RadioGroup>
              {userTypeError && (
                <FormHelperText sx={{ color: "red" }}>{userTypeErrorMessage}</FormHelperText>
              )}
            </FormControl>


            <FormControl>
              <InputField
                type="text"
                label="First Name"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                error={nameError}
                helpertext={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <InputField
                type="text"
                label="Middle Name"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                error={nameError}
                helpertext={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <InputField
                type="text"
                label="Last Name"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                error={nameError}
                helpertext={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
            </FormControl>

            <FormControl>
              <InputField
                type="text"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helpertext={emailErrorMessage}
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
                helpertext={
                  Array.isArray(passwordErrorMessage) && passwordErrorMessage.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: "16px", textAlign: "left", fontSize: "12px" }}>
                      {passwordErrorMessage.map((msg, index) => (
                        <li key={index} style={{ color: "red" }}>{msg}</li>
                      ))}
                    </ul>
                  ) : ""
                }
              />
            </FormControl>

            <FormControl>
              <InputField
                label="Confirm Password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
                helpertext={confirmPasswordErrorMessage}
              />
            </FormControl>

            <FormsButton label="Sign Up" type="submit" />

            <Typography sx={{ textAlign: "center" }}>
              Have an account?{" "}
              <Link component={RouterLink} to="/login" style={{ cursor: "pointer", textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </Box>
      </CardWrapper>
    </RootContainer>
  );
}

export default SignupForm;