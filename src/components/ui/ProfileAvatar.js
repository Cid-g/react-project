import * as React from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from 'prop-types';

const ProfileAvatar = ({ userType, profilePicture }) => { 

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  // Handle avatar image loading errors
  const handleImageError = (e) => {
    e.target.src = '/default-avatar.png'; // Fallback image
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (path) => {
    handleCloseUserMenu();
    navigate(path);
  };
  ProfileAvatar.propTypes = {
    userType: PropTypes.string.isRequired,
    profilePicture: PropTypes.string // Add this
  };
  

  return (
    <Toolbar disableGutters sx={{ justifyContent: "flex-end", my: 1 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar 
            alt="User Avatar" 
            src={
              profilePicture 
                ? `http://localhost:5000${profilePicture}`
                : '/default-avatar.png'
            }
            onError={handleImageError}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid #fff',
              boxShadow: 3
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => handleMenuClick("/profile")}>
          Profile
        </MenuItem>
        
        {userType === "Teacher" && (
          <MenuItem onClick={() => handleMenuClick("/teacher")}>
            Dashboard
          </MenuItem>
        )}

        <MenuItem onClick={() => {
          localStorage.removeItem('token');
          handleMenuClick("/login");
        }}>
          Logout
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default ProfileAvatar;