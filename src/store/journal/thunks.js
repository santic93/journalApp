import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from './journalSlice';
import { loadNOtes } from '../../helpers/loadNotes';
////CON ESTE CODIGO ESTOY INSERTANDO UNA NUEVA NOTA EN FIREBASE
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    //tomar uid, crear nota
    const newNote = {
      title: '',
      body: '',
      //date: new Date().getTime(),
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
/////TRAERNOS LAS NOTAS
export const startLoadingNotes = (uid = '') => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('EL UID DEL USUARIO NO ESXISTE');
    const notes = await loadNOtes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journalSlice;
    console.log(note)
    const noteToFirestore = { ...note };
    console.log(noteToFirestore)
    delete noteToFirestore.id;
    /////guardo la nota en firebase
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });
    dispatch(updateNote(note));
  };
};
