import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Add, Notifications, Message } from "@mui/icons-material";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);

  const actions = [
    { icon: <Notifications />, label: "Notifications" },
    { icon: <Message />, label: "Messages" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
      >
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ type: "spring", stiffness: 250, damping: 15, delay: index * 0.05 }}
          >
            <Tooltip title={action.label} placement="left">
              <IconButton
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  "&:hover": { bgcolor: "#115293" },
                  boxShadow: 3,
                }}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Floating Button */}
      <IconButton
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          "&:hover": { bgcolor: "#115293" },
          boxShadow: 3,
        }}
      >
        <Add />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
