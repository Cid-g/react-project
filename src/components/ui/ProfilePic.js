import React from "react";
import { Avatar, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function ProfilePic({ profilePic, setProfilePic }) {
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Avatar src={profilePic} sx={{ width: 140, height: 140, border: "5px solid white" }} />
      <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: "none" }} id="upload-photo" />
      <label htmlFor="upload-photo">
        <IconButton component="span" sx={{ position: "absolute", bottom: 0, right: 0, background: "#1976d2", color: "white" }}>
          <PhotoCameraIcon />
        </IconButton>
      </label>
    </div>
  );
}

export default ProfilePic;
