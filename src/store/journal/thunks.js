import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from './journalSlice';
import { loadNOtes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';
////CON ESTE CODIGO ESTOY INSERTANDO UNA NUEVA NOTA EN FIREBASE
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    //tomar uid, crear nota
    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime()
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
}


export const startLoadingNotes = () => {
  return async( dispatch, getState ) => {
      
      const { uid } = getState().auth;
      if ( !uid ) throw new Error('El UID del usuario no existe');

      const notes = await loadNOtes( uid );
      dispatch( setNotes( notes ) );
  }
}

export const startSaveNote = () => {
  return async( dispatch, getState ) => {

      dispatch( setSaving() );

      const { uid } = getState().auth;
      const { active:note } = getState().journalSlice;

      const noteToFireStore = { ...note };
      delete noteToFireStore.id;
  
      const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
      await setDoc( docRef, noteToFireStore, { merge: true });

      dispatch( updateNote( note ) );

  }
}


export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
      dispatch( setSaving() );
          
      // await fileUpload( files[0] );
      const fileUploadPromises = [];
      for ( const file of files ) {
          fileUploadPromises.push( fileUpload( file ) )
      }

      const photosUrls = await Promise.all( fileUploadPromises );
      
      dispatch( setPhotosToActiveNote( photosUrls ));
      
  }
}


export const startDeletingNote = () => {
  return async( dispatch, getState) => {

      const { uid } = getState().auth;
      const { active: note } = getState().journalSlice;

      const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
      await deleteDoc( docRef );

      dispatch( deleteNoteById(note.id) );

  }
}