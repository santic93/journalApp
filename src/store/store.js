import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { journalSlice } from './journal/journalSlice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    journalSlice: journalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['journalSlice.notes.date'],

        ignoredActionPaths: ['payload.note.date'],

        ignoredActions: ['journal/setActiveNote'],
      },
    }),
  // middleware: getDef({
  //   serializableCheck: {
  //     // Ignora ciertas rutas en el estado
  //     ignoredPaths: ['journalSlice.notes.date'],
  //     // Ignora ciertas acciones
  //     ignoredActionPaths: ['payload.note.date'],
  //     // Ignora valores específicos
  //     ignoredActions: ['journal/setActiveNote'],
  //   },
  // }),
});
