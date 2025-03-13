import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Add, Notifications, Message, Settings, AccountCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);

  const actions = [
    { icon: <Notifications fontSize="large" />, label: "Notifications" },
    { icon: <Message fontSize="large" />, label: "Messages" },
    { icon: <Settings fontSize="large" />, label: "Settings" },
    { icon: <AccountCircle fontSize="large" />, label: "Profile" },
    
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        right: 20,
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: hovered ? 1 : 0,
          height: hovered ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15 }}
      >
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ type: "spring", stiffness: 250, damping: 15, delay: index * 0.05 }}
          >
            <Tooltip title={action.label} placement="left">
              <IconButton
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  width: 60,
                  height: 60,
                  "&:hover": { bgcolor: "#115293" },
                  boxShadow: 5,
                }}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          </motion.div>
        ))}
      </motion.div>

    
      <IconButton
        sx={{
          bgcolor: "#ff5722",
          color: "white",
          width: 70,
          height: 70,
          "&:hover": { bgcolor: "#e64a19" },
          boxShadow: 5,
        }}
      >
        <Add fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
