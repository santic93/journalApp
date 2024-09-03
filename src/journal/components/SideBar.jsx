import { Image, TurnedInNot } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';
import { SideBarItem } from './SideBarItem';
import { useState } from 'react';

export const SideBar = ({ drawerWidth = 240, isMobile, mobileOpen, onToggleDrawer}) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journalSlice);
  const dispatch = useDispatch();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box
    component='nav'
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
  >
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onToggleDrawer}
      ModalProps={{
        keepMounted: true, // Mejora el rendimiento en dispositivos móviles
      }}
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          {displayName}
        </Typography>
        <Avatar
          src={photoURL}
          variant='square'
          sx={{
            marginLeft: '5px',
          }}
        />
      </Toolbar>
      <Divider />

      <List>
        {notes?.map((note) => (
          <SideBarItem key={note.id} {...note} onClick={isMobile ? onToggleDrawer : null} />
        ))}
      </List>
    </Drawer>
  </Box>

  );
};
