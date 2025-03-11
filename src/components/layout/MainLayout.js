// src/components/layout/MainLayout.js
import React from 'react';
import { Box } from '@mui/material';
import { drawerWidth } from '../../constants';
import SlideMenu from '../ui/Menu';

export default function MainLayout({ isMenuOpen, children }) {
  return (
    <Box sx={{ 
      display: 'flex',
      position: 'relative',
      marginTop: '64px' // Match header height
      
    }}>
        
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s ease-in-out',
          marginLeft: isMenuOpen ? `${drawerWidth}px` : 0,
          width: isMenuOpen ? `calc(100% - ${drawerWidth}px)` : '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}