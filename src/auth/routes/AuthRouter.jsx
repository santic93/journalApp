import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from '../pages';

export const Auth = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='*/' element={<Navigate to='/' />} />
    </Routes>
  );
};
