import { TurnedInNot } from '@mui/icons-material';
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

export const SideBar = ({ drawerWidth = 240, imageUrl = [] }) => {
  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journalSlice);
  const dispatch = useDispatch();

  return (
    <Box
      component={'nav'}
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawe-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component={'div'}>
            {displayName}
          </Typography>
          <Avatar
            alt={displayName}
            src={`${photoURL}`}
            sx={{ margin: '10px' }}
          />
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
