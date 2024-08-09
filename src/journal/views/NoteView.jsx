import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: { note },
  } = useSelector((state) => state.journalSlice);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction={'row'}
      justifyContent={'space-between'}
      sx={{ mb: 1 }}
      alignItems={'center'}
    >
      <Grid item>
        {/* <Typography fontSize={39} fontWeight={'light'}>
          {dateString}
        </Typography> */}
      </Grid>
      <Grid item>
        <Button
          color='primary'
          sx={{ padding: 2 }}
          onClick={() => dispatch(startSaveNote())}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name={title}
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que paso hoy?'
          minRows={5}
          name={body}
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
