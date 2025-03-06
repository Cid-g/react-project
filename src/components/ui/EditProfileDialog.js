import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";

function EditProfileDialog({ open, onClose, user, setUser }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to update profile");
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        {/* ... existing form fields with formData instead of user */}
        <TextField 
          label="First Name" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          fullWidth 
          sx={{ mb: 2 }} 
        />
        {/* Add other fields similarly */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProfileDialog;