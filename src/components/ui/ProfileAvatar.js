import * as React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ProfileAvatar = ({ userType }) => { // Receive userType as a prop
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // React Router navigation

  // Open menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle menu click and navigate
  const handleMenuClick = (path) => {
    handleCloseUserMenu(); // Close the menu
    navigate(path); // Navigate to selected page
  };

  return (
    <Toolbar disableGutters sx={{ justifyContent: "flex-end", my: 1 }}>
      {/* Profile Avatar */}
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>

      {/* Dropdown Menu */}
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
        
        {/* Show Dashboard only if userType is "Admin" */}
        {userType === "Admin" && (
          <MenuItem onClick={() => handleMenuClick("/dashboard")}>Dashboard</MenuItem>
        )}

        <MenuItem onClick={() => handleMenuClick("/homepage")}>Logout</MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default ProfileAvatar;
