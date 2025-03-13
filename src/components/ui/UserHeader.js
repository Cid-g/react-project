// src/components/ui/UserHeader.js
import React, { useEffect, useState } from "react";
import BaseHeader from "../layout/HeaderWrapper";
import ProfileAvatar from "./ProfileAvatar";
import Logo from "./Logo";
import { IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function UserHeader({ isMenuOpen, onMenuToggle }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/api/auth/users", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.firstName || !data.userType) {
          throw new Error("Invalid user data received");
        }
        localStorage.setItem('userType', data.userType);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem('userType');
        setError(error.message);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;

  return (
    <BaseHeader
    isMenuOpen={isMenuOpen}  
    onMenuToggle={onMenuToggle}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onMenuToggle} 
        edge="start"
        sx={{ marginRight: 5 }}
        
      >
        <MenuIcon />
      </IconButton>
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Logo to={user?.userType === "Teacher" ? "/teacher" : "/user"} />
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Typography variant="h6">Welcome, {user.firstName}</Typography>
          <ProfileAvatar userType={user.userType}  profilePicture={user.profilePicture} />
        </Box>
      </Box>
    </BaseHeader>
  );
}

export default UserHeader;