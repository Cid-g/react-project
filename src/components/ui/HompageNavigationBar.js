import React from "react";
import { Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../layout/HeaderWrapper.js"; // Use updated Header
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Box from "@mui/system/Box";


const NavButton = styled(Button)({
  color: "#f8f9fa",
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    color: "#17a2b8",
  },
});

function HomePageNavigationBar() {
  return (
    <Header>
      <Toolbar  sx={{ display: "flex", justifyContent: "space-between", width: "100%", paddingX: "20px" }}>
       
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Logo/> 
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "15px", px: 5 }}>
        <NavButton component={Link} to="/">Home</NavButton>
        <NavButton component={Link} to="/about">About</NavButton>
        <NavButton component={Link} to="/login">Login</NavButton>
        </Box>
      </Toolbar>
    </Header>
  );
}

export default HomePageNavigationBar;