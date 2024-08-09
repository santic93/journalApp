import { Link as RouterLink } from 'react-router-dom';
import { Google, Password } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import AuthLayout from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLOginWithEmailPassword,
} from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

export const Login = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formDate = {
    email: '',
    password: '',
  };
  const { email, password, onInputChange } = useForm(formDate);
  const isAuthenticated = useMemo(() => status === 'checking', [status]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLOginWithEmailPassword({ email, password }));
  };
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };
  return (
    <AuthLayout title='Login'>
      <form action='' onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              onChange={onInputChange}
              value={email}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='----'
              fullWidth
              name='password'
              onChange={onInputChange}
              value={password}
              required
            />
            <Grid
              container
              display={!!errorMessage ? ' ' : 'none'}
              sx={{ mt: 1 }}
            >
              <Grid item xs={12}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  fullWidth
                  type='submit'
                  disabled={isAuthenticated}
                >
                  Entrar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isAuthenticated}
                  variant='contained'
                  fullWidth
                  onClick={onGoogleSignIn}
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'end'}>
            <Link component={RouterLink} to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
