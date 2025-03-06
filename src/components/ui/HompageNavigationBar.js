import React from "react";
import { Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import Header from "../layout/HeaderWrapper.js"; // Use updated Header
import { Link } from "react-router-dom";
import Logo from "./Logo";


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
      <Toolbar>
        <Logo/>
        <NavButton to="/">Home</NavButton>
        <NavButton component={Link} to="/about">About</NavButton>
        <NavButton component={Link} to="/login">Login</NavButton>
      </Toolbar>
    </Header>
  );
}

export default HomePageNavigationBar;
