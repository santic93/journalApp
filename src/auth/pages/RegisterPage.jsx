import React, { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { purple, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
export const Register = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === 'checking',
    [status]
  );
  const formData = {
    email: '',
    password: '',
    displayName: '',
  };
  const formValidations = {
    email: [(value) => value.includes('@'), 'El formato no es correcto'],
    password: [(value) => value.length >= 6, 'Minimo 6 Caracteres'],
    displayName: [
      (value) => value?.length >= 3,
      'Nombre Obligatorio, minimo 3 caracteres',
    ],
  };
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
  } = useForm(formData, formValidations);

  const onSUbmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title='Registro'>
      {/* <h3 >
        Validando Campos:{' '}
        <b style={{ color: primary }}>
          {isFormValid ? 'Valido' : 'Incorrecto'}
        </b>
      </h3> */}
      <form action='' onSubmit={onSUbmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Nombre completo'
              type='text'
              placeholder='Nombre y Apellido'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='text'
              placeholder='Email'
              fullWidth
              name='email'
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type='password'
              placeholder='*********'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6} display={!!errorMessage ? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isCheckingAuthentication}
                  type='submit'
                  variant='contained'
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction={'row'} justifyContent={'end'}>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} to='/auth/login'>
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
