import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';
import MenuIcon from '@mui/icons-material/Menu';
export const NavBar = ({ drawerWidth, onToggleDrawer }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
    position='fixed'
    sx={{
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    }}
  >
    <Toolbar>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        onClick={onToggleDrawer}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap component='div'>
        Journal App
      </Typography>
    </Toolbar>
  </AppBar>
  
  );
};
