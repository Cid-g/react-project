import React, { useState } from "react";
import { Stack, Typography, FormControl, FormControlLabel, Radio, RadioGroup, MenuItem  } from "@mui/material";
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
  const [sex, setSex] = useState("");

  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [section, setSection] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");


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
  const [sexError, setSexError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [collegeError, setCollegeError] = useState(false);
  const [courseError, setCourseError] = useState(false);
  const [yearLevelError, setYearLevelError] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [sexErrorMessage, setSexErrorMessage] = useState("");
  const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
  const [collegeErrorMessage, setCollegeErrorMessage] = useState("");
  const [courseErrorMessage, setCourseErrorMessage] = useState("");
  const [yearLevelErrorMessage, setYearLevelErrorMessage] = useState("");
  const [sectionErrorMessage, setSectionErrorMessage] = useState("");

  const navigate = useNavigate();

  const availableCourses = [
    "BS Information Technology", "BS Computer Science", "BS Business Administration",
    "BS Accountancy", "BS Psychology", "BS Civil Engineering", "BS Electrical Engineering",
    "BS Mechanical Engineering", "BS Nursing", "BS Architecture", "BS Education",
    "BS Hospitality Management", "BS Tourism Management"
  ];
  
  const colleges = [
    "College of Engineering and Technology", 
    "College of Art And Science",
    "College of Business and Management",
    "College of Agriculture and Forestry"
  ];

  const yearLevels = [
    "First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year"
  ];
  const sections = ["A", "B", "C", "D", "E"];

  const months = ["January", "February", "March","April", "May",
                  "June", "July", "August","September",
                  "October", "November", "December"];

 const days = Array.from({ length: 31 }, (_, i) => i + 1);
 const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
                


  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;
    let passwordErrors = [];
    let confirmPasswordErrorMsg = "";

    // Reset all error states
    const resetErrors = () => {
      setNameError(false);
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
      setUserTypeError(false);
      setSexError(false);
      setBirthDateError(false);
      setCollegeError(false);
      setCourseError(false);
      setYearLevelError(false);
      setSectionError(false);
      
      // Reset error messages
      setNameErrorMessage("");
      setEmailErrorMessage("");
      setPasswordErrorMessage([]);
      setConfirmPasswordErrorMessage("");
      setUserTypeErrorMessage("");
      setSexErrorMessage("");
      setBirthDateErrorMessage("");
      setCollegeErrorMessage("");
      setCourseErrorMessage("");
      setYearLevelErrorMessage("");
      setSectionErrorMessage("");
    };

    
    resetErrors();

    const monthNumber = birthMonth !== "" ? parseInt(birthMonth) + 1 : null;
    const formattedMonth = String(monthNumber).padStart(2, '0');
    const formattedDay = String(birthDay).padStart(2, '0');
    const birthDate = `${birthYear}-${formattedMonth}-${formattedDay}`;
    
    // User type validation
    if (!userType) {
      setUserTypeError(true);
      setUserTypeErrorMessage("⚠️ User Type is required.");
      return;
    }

    // Teacher-specific validation
    if (userType === ROLES.TEACHER) {
      if (!sex) {
        setSexError(true);
        setSexErrorMessage("⚠️ Sex is required.");
        isValid = false;
      }
      if (!birthMonth || !birthDay || !birthYear) {
        setBirthDateError(true);
        setBirthDateErrorMessage("⚠️ Birth date is required.");
        isValid = false;
      }
      if (!college) {
        setCollegeError(true);
        setCollegeErrorMessage("⚠️ College is required.");
        isValid = false;
      }
    }

    // Student-specific validation
    if (userType === ROLES.STUDENT) {
      if (!course) {
        setCourseError(true);
        setCourseErrorMessage("⚠️ Course is required.");
        isValid = false;
      }
      if (!yearLevel) {
        setYearLevelError(true);
        setYearLevelErrorMessage("⚠️ Year level is required.");
        isValid = false;
      }
      if (!section) {
        setSectionError(true);
        setSectionErrorMessage("⚠️ Section is required.");
        isValid = false;
      }
    }

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
    };
    


    if (!isValid) {
      console.log("Validation failed.");
      return;
    }

    try {
      console.log("Sending signup request to:", "http://localhost:5000/api/auth/signup");
      const body = {
        firstName: firstname.trim(),
        middleName: middlename.trim(),
        lastName: lastname.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        userType,
        sex,
        birthDate: `${birthYear}-${String(Number(birthMonth)+1).padStart(2,'0')}-${String(birthDay).padStart(2,'0')}`,
        college: college,
        ...(userType === ROLES.STUDENT && {
          course: course,
          yearLevel: yearLevel,
          section: section
        })
      };
      
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
      <CardWrapper maxWidth="600px" top= "30px">
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h1" sx={{ fontSize: "1.8rem", textAlign: 'center', mb: 1 }}>
              Sign up
            </Typography>

            {/* User Type Radio Group */}
            <FormControl error={userTypeError} sx={{ mb: 1 }}>
              <Typography variant="subtitle2">User Type</Typography>
              <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                <FormControlLabel 
                  value={ROLES.TEACHER} 
                  control={<Radio size="small" />} 
                  label="Teacher" 
                />
                <FormControlLabel 
                  value={ROLES.STUDENT} 
                  control={<Radio size="small" />} 
                  label="Student" 
                />
              </RadioGroup>
              {userTypeError && <FormHelperText sx={{ color: "error.main" }}>{userTypeErrorMessage}</FormHelperText>}
            </FormControl>

            {/* Name Fields */}
            <Stack direction="row" spacing={1}>
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
              <InputField
                type="text"
                label="Middle Name"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                error={nameError}
                helpertext={nameErrorMessage}
                color={nameError ? "error" : "primary"}
              />
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
            </Stack>

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helpertext={emailErrorMessage}
             
            />

          
           {/* Sex Field */}
            <Stack direction="row" spacing={1}>
            <FormControl sx={{ width: '50%' }} error={sexError} required>
            <Typography variant="body2">Sex</Typography>
            <RadioGroup row value={sex} onChange={(e) => setSex(e.target.value)}>
                  <FormControlLabel
                    value="Male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
                {sexError && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {sexErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Birth Date Fields */}
              <FormControl error={birthDateError} sx={{ width: '50%' }}>
                <Stack direction="row" spacing={1}>
                  <InputField
                    select
                    label="Month"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    error={birthDateError}
                    helperText={birthDateErrorMessage}
                    sx={{ flex: 1 }}
                  >
                    {months.map((month, index) => (
                      <MenuItem key={index} value={index}>{month}</MenuItem>
                    ))}
                  </InputField>
                  <InputField
                    select
                    label="Day"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    error={birthDateError}
                    helperText={birthDateErrorMessage}
                    sx={{ width: 80 }}
                  >
                    {days.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                  </InputField>
                  <InputField
                    select
                    label="Year"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    error={birthDateError}
                    helperText={birthDateErrorMessage}
                    sx={{ width: 100 }}
                  >
                    {years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)}
                  </InputField>
                </Stack>
                {birthDateError && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {birthDateErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>

            {/* College Field */}
            <FormControl error={collegeError} fullWidth>
              <InputField
                select
                label="College"
                required 
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                error={collegeError}
                helperext={collegeErrorMessage}
              >
                {colleges.map(college => (
                  <MenuItem key={college} value={college}>{college}</MenuItem>
                ))}
              </InputField>
            </FormControl>
            
            {userType === ROLES.STUDENT && (
              <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                <InputField
                  select
                  label="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  error={courseError}
                  helpertext={courseErrorMessage}
                  color={courseError ? "error" : "primary"}
                  sx={{ flex: 1 }}
                >
                  {availableCourses.map(course => (
                    <MenuItem key={course} value={course}>{course}</MenuItem>
                  ))}
                </InputField>
                <InputField
                  select
                  label="Year"
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  error={yearLevelError}
                  helpertext={yearLevelErrorMessage}
                  color={yearLevelError ? "error" : "primary"}
                  sx={{ width: 150 }}
                >
                  {yearLevels.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </InputField>
                <InputField
                  select
                  label="Section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  error={sectionError}
                  helpertext={sectionErrorMessage}
                  color={sectionError ? "error" : "primary"}
                  sx={{ width: 150 }}
                >
                  {sections.map(sec => (
                    <MenuItem key={sec} value={sec}>{sec}</MenuItem>
                  ))}
                </InputField>
              </Stack>
            )}

        
            <Stack spacing={1}>
              <InputField
              label="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
              
              />
              <InputField
                label="Confirm Password"
                 id= "password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
                helpertext={confirmPasswordErrorMessage}
                color={passwordError ? "error" : "primary"}
                
              />
            </Stack>

            <FormsButton 
              label="Sign Up" 
              type="submit" 
              sx={{ mt: 1, py: 1 }}
            />

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" sx={{ fontWeight: 500 }}>
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