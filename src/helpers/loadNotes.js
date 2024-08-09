import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNOtes = async (uid = '') => {
  if (!uid) throw new Error('EL UID DEL USUARIO NO ESXISTE');
  ////ME TRAIGO LA COLECCION, LAS INSTANCIAS DE MI DB
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes = [];
  docs.forEach((document) => {
    notes.push({ id: document.id, ...document.data() });
  });

  return notes;
};
