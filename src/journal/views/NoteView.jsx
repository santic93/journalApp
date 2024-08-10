import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
export const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active:  note ,
    saveMessage,
    isSaving,
  } = useSelector((state) => state.journalSlice);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);
  useEffect(() => {
    if (saveMessage.length > 0) {
      Swal.fire('Nota actualizada', saveMessage, 'success');
    }
  }, [saveMessage]);
  return (
    <Grid
    container 
    direction='row' 
    justifyContent='space-between' 
    alignItems='center' 
    sx={{ mb: 1 }}
    className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        {/* <Typography fontSize={39} fontWeight={'light'}>
          {dateString}
        </Typography> */}
      </Grid>
      <Grid item>
        <Button
          disabled={isSaving}
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
           type="text"
           variant="filled"
           fullWidth
           placeholder="Ingrese un título"
           label="Título"
           sx={{ border: 'none', mb: 1 }}
           name="title"
           value={ title }
           onChange={ onInputChange }
        />
        <TextField
             type="text"
             variant="filled"
             fullWidth
             multiline
             placeholder="¿Qué sucedió en el día de hoy?"
             minRows={ 5 }
             name="body"
             value={ body }
             onChange={ onInputChange }
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
