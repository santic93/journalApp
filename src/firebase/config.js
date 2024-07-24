// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClVbCoJD_N-2E8HuWjlrOF-kBigzHJcV8',
  authDomain: 'react-cursos-aabc3.firebaseapp.com',
  projectId: 'react-cursos-aabc3',
  storageBucket: 'react-cursos-aabc3.appspot.com',
  messagingSenderId: '162115736983',
  appId: '1:162115736983:web:124baaac6102e8d5b660d2',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
