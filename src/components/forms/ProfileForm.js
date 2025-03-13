import React, { useState, useEffect } from "react";
import { 
  Box, IconButton, Typography, TextField, Button, FormLabel, FormControl, 
  RadioGroup, FormControlLabel, Radio, Select, MenuItem, Avatar
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
    college: "",
  });

  const availableCourses = {
    "College of Engineering and Technology": [
      "BS Information Technology",
      "BS Computer Science",
      "BS Civil Engineering",
      "BS Electrical Engineering",
      "BS Mechanical Engineering"
    ],
    "College of Arts and Sciences": [
      "BS Psychology",
      "BS Education"
    ],
    "College of Business and Management": [
      "BS Business Administration",
      "BS Accountancy",
      "BS Hospitality Management",
      "BS Tourism Management"
    ],
    "College of Agriculture and Forestry": [
      "BS Agriculture",
      "BS Forestry",
      "BS Environmental Science",
      "BS Food Technology"
    ]
  };
  
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
          college: data.college || "",
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

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Add client-side validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('profilePicture', file); // Must match multer field name
  
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile/upload-profile-picture', {
        method: 'PATCH', // Verify endpoint matches backend route
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
  
      // Update state
      setUser(prev => ({...prev, profilePicture: data.data.profilePicture }));
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to update profile picture');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      <Typography variant="h3">Profile</Typography>
      <br />
      <Typography variant="h6">Profile Picture</Typography>
      
      <label htmlFor="avatar-upload">
            <IconButton component="span">
              <Avatar 
                sx={{ width: 70, height: 70, cursor: 'pointer' }}
                src={user?.profilePicture 
                  ? `http://localhost:5000${user.profilePicture}`
                  : '/default-avatar.png'
                }
              />
            </IconButton>
        </label>
      <input
        id="avatar-upload"
        type="file"
        hidden
        accept="image/*"
        onChange={handleAvatarUpload}
      />

      <Box sx={{ textAlign: "start", mt: 4 }}>
        <Typography variant="p" sx={{ mt: 1, fontWeight: "bold" }}>
          {user.firstName} {user.middleName || ""} {user.lastName}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          {user.userType}
          {user.userType === 'Student' && 
            ` | ${user.yearLevel || "No year level"}, Section ${user.section || "No section"}`
          }
        </Typography>

        <IconButton
          sx={{ mt: 2, background: "#1976d2", color: "white" }}
          onClick={() => setEditOpen(true)}
        >
          <EditIcon />
        </IconButton>
      </Box>

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

            {user.userType === 'Teacher' && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel>College</FormLabel>
                <Select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select College</MenuItem>
                  {colleges.map((college, index) => (
                    <MenuItem key={index} value={college}>{college}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {user.userType === 'Student' && (
              <>
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

                <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel>Section</FormLabel>
                <Select
                  name="section"
                  value={formData.sections}
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="" disabled>Select Section</MenuItem>
                  {sections.map((sections, index) => (
                    <MenuItem key={index} value={sections}>{sections}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              </>
            )}

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