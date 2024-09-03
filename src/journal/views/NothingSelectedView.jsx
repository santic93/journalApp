import {
  StarOutline,
  StarRateOutlined,
  StartOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const NothingSelectedView = () => {
  const { notes } = useSelector((state) => state.journalSlice);

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: '#004d40',
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          color='black'
          variant='h3'
          sx={{ textAlign: 'center', justifyContent: 'center' }}
        >
          Seleccione o cree una Nota
        </Typography>
      </Grid>
    </Grid>
  );
};
