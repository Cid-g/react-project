import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Person2Icon from '@mui/icons-material/Person2';

function SlideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle drawer function
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  // Menu items
  const menuItems = [
    { label: "Home", to: "/user", icon: <HomeIcon /> },
    {label: "Profile", to:"/profile", icon: <Person2Icon />},
    { label: "Settings", to: "/user", icon: <SettingsIcon /> },
    { label: "About", to: "/user", icon: <InfoIcon /> },
    { label: "Contact", to: "/contact", icon: <ContactMailIcon /> },
  ];

  return (
    <div>
      {/* Hamburger Menu Button */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Sliding Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            background: "linear-gradient(135deg,rgb(206, 206, 231),rgb(152, 172, 207))",
            color: "#fff",
          },
        }}
      >
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {/* Logo Section */}
          <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
            <Logo to="/user" />
          </Box>

          {/* Menu Items */}
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.to}
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "rgba(114, 105, 105, 0.2)", // Hover effect
                    transition: "0.3s ease-in-out",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default SlideMenu;
