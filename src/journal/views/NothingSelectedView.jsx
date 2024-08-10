import { StarRateOutlined, StartOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const NothingSelectedView = () => {
  const { notes } = useSelector((state) => state.journalSlice);
  console.log(notes);
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarRateOutlined sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color='white' variant='h5'>
          {notes.length ? 'Selecciona o crea una nota' : 'Crea una Nota'}
        </Typography>
      </Grid>
    </Grid>
  );
};
