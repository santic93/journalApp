import { collection, doc, setDoc } from 'firebase/firestore/lite';
import React from 'react';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';
////CON ESTE CODIGO ESTOY INSERTANDO UNA NUEVA NOTA EN FIREBASE
export const startNewNote = () => {
  let now = new Date();
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    //tomar uid, crear nota
    const newNote = {
      title: '',
      body: '',
      date: now,
    };
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    ///primero me pide la referencia donde quiero insertarla, y segundo el documento que quiero guardar en la base
    const setDocRes = await setDoc(newDoc, newNote);
    ///le creo la propiedad id a la nota
    newNote.id = newDoc.id;
    ///despues hacer dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};
