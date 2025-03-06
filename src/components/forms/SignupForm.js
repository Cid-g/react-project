import { Stack, Typography, FormControl } from "@mui/material";
import CardWrapper from "../layout/CardWrapper.js";
import RootContainer from "../layout/RootContainer.js";
import InputField from "../ui/InputField.js";
import FormsButton from "../ui/FormButton.js";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import * as React from 'react';
import { useNavigate } from "react-router-dom"; 
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [userTypeError, setUserTypeError] =useState(false);
  const [userTypeErrorMessage, setUserTypeErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

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
    setUserTypeErrorMessage('');

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
    if (userType ===''){
      setUserTypeError(true);
      setUserTypeErrorMessage('⚠️ User Type is required.')
      isValid = false;
    }

    if (!isValid) {
      console.log("Validation failed.");
      return;
    }

    try {
      console.log("Sending signup request to:", "http://localhost:5000/api/auth/signup"); // Debug log
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

      console.log("Response status:", response.status); // Debug log
      const data = await response.json();
      console.log("Response data:", data); // Debug log

      if (response.ok) {
        console.log("Signup successful:", data);
         toast.success("Sign up successful!", {
                  position: "top-right",
                  autoClose: 2000,
                });
        navigate("/login");
      } else {
        console.error("Signup failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
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
              <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userType}
                      label="User Type"
                      onChange={(e) => setUserType(e.target.value)}
                      error = {userTypeError}
                      helperText = {userTypeErrorMessage}
                      color= {userTypeError ? "error" : "primary"}
                    >
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
        
               </Select>
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