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
          {notes.length ? (
            <>
              {notes.map((note) => (
                <ListItem key={note.id} disablePadding>
                  <ListItemButton
                    onClick={() => dispatch(setActiveNote({ note, imageUrl }))}
                  >
                    <ListItemIcon>
                      <TurnedInNot />
                    </ListItemIcon>
                    <Grid container>
                      <ListItemText
                        // primary={
                        //   note.title.length > 17
                        //     ? note.title.substring(0, 17) + '...'
                        //     : note.title
                        // }
                      />
                      <ListItemText secondary={note.body} />
                    </Grid>
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          ) : (
            <Box
              component={'nav'}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <h3>Todavia no tenes Notas...</h3>
            </Box>
          )}
        </List>
      </Drawer>
    </Box>
  );
};
