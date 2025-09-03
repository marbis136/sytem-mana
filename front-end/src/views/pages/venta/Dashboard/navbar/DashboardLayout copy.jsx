import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Topbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
