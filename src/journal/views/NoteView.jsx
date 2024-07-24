import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
  const fecha = new Date();
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
        <Typography fontSize={39} fontWeight={'light'}>
          {'Dia ' +
            fecha.getDay() +
            ' ' +
            'Mes ' +
            fecha.getMonth() +
            ' ' +
            'Año ' +
            fecha.getFullYear()}
        </Typography>
      </Grid>
      <Grid item>
        <Button color='primary' sx={{ padding: 2 }}>
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
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que paso hoy?'
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
