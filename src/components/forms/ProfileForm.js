import React, { useState, useEffect } from "react";
import { 
  Box, IconButton, Typography, TextField, Button, FormLabel, FormControl, 
  RadioGroup, FormControlLabel, Radio, Select, MenuItem 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserProfileContainer from "../layout/UserProfileContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ProfileForm() {
  const [editOpen, setEditOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    birthDate: "",
    course: "",
    yearLevel: "",
    section: "",
  });

  // Available courses in the Philippines
  const availableCourses = [
    "BS Information Technology", "BS Computer Science", "BS Business Administration",
    "BS Accountancy", "BS Psychology", "BS Civil Engineering", "BS Electrical Engineering",
    "BS Mechanical Engineering", "BS Nursing", "BS Architecture", "BS Education",
    "BS Hospitality Management", "BS Tourism Management"
  ];

  // Year Level Options
  const yearLevels = [
    "First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year"
  ];

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
        setFormData({
          firstName: data.firstName || "",
          middleName: data.middleName || "",
          lastName: data.lastName || "",
          sex: data.sex || "",
          birthDate: data.birthDate || "",
          course: data.course || "",
          yearLevel: data.yearLevel || "",
          section: data.section || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();
      setUser(data);
      setEditOpen(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>No profile data found</Typography>;

  return (
    <UserProfileContainer>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
          {user.firstName} {user.middleName || ""} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {user.userType} | {user.yearLevel || "No year level"}, Section {user.section || "No section"}
        </Typography>

        <IconButton
          sx={{ mt: 2, background: "#1976d2", color: "white" }}
          onClick={() => setEditOpen(true)}
        >
          <EditIcon />
        </IconButton>
      </Box>

      {/* Edit Profile Dialog */}
      {editOpen && (
        <Box sx={{ mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Radio Group for Sex */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Sex</FormLabel>
              <RadioGroup
                row
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Birth Date"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />

            {/* Select for Course */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Course</FormLabel>
              <Select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Course</MenuItem>
                {availableCourses.map((course, index) => (
                  <MenuItem key={index} value={course}>{course}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Select for Year Level */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Year Level</FormLabel>
              <Select
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Year Level</MenuItem>
                {yearLevels.map((level, index) => (
                  <MenuItem key={index} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
          </form>
        </Box>
      )}
    </UserProfileContainer>
  );
}

export default ProfileForm;
