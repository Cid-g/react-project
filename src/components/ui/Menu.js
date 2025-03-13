import React from "react";
import { Drawer as MuiDrawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SettingsIcon from "@mui/icons-material/Settings";
import Person2Icon from "@mui/icons-material/Person2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { drawerWidth } from "../../constants";
import ListIcon from '@mui/icons-material/List';

const StyledDrawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    marginTop: '104px' 
  },
}));

const StyledListItemButton = styled(ListItemButton)({
  borderRadius: "8px",
  margin: "4px 8px",
  "&:hover": {
    backgroundColor: "#E3E8EE",
    transform: "scale(1.02)",
    transition: "all 0.2s ease-in-out",
  },
});

function SlideMenu({ isMenuOpen, onMenuToggle }) {
  const userType = localStorage.getItem('userType');

  const homePath = userType === 'Teacher' ? "/teacher" : 'Student'? '/student' : "/";

  const menuItems = [
    { label: "Home", to: homePath, icon: <HomeIcon /> },
    { label: "Profile", to: "/profile", icon: <Person2Icon /> },
    // Conditionally include Students List for Teachers
    ...(userType === 'Teacher' ? [{ label: "Students List", to: "/lists", icon: <ListIcon /> }] : []),
    { label: "Settings", to: "/setting", icon: <SettingsIcon /> },
    { label: "About", to: homePath, icon: <InfoIcon /> },
    { label: "Contact", to: homePath, icon: <ContactMailIcon /> }
  ];

  return (
    <StyledDrawer variant="persistent" anchor="left" open={isMenuOpen}>
      <Divider sx={{ backgroundColor: "#E3E8EE" }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <StyledListItemButton component={Link} to={item.to}>
              <ListItemIcon sx={{ color: "#4A90E2", minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}
export default SlideMenu;