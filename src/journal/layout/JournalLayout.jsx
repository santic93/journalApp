import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

const drawerWidth = 240;
export const JournalLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
    }}
    className='animate__animated animate__fadeIn animate__faster'
  >
    <NavBar drawerWidth={drawerWidth} onToggleDrawer={handleDrawerToggle} />
    <SideBar drawerWidth={drawerWidth} isMobile={isMobile} mobileOpen={mobileOpen} onToggleDrawer={handleDrawerToggle} />
    <Box
      component={'main'}
      sx={{
        flexGrow: 1,
        p: 3,
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <Toolbar />
      {children}
    </Box>
  </Box>
  
  );
};
