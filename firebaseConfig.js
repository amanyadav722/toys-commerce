import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJHIzgoLOxjYPjRXXHDvafF8wJoHhoQ3M",
  authDomain: "estiam-native-app.firebaseapp.com",
  projectId: "estiam-native-app",
  storageBucket: "estiam-native-app.appspot.com",
  messagingSenderId: "24914975239",
  appId: "1:24914975239:web:0c555bab651e223e2f68a2",
  measurementId: "G-Q048GTMKRC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 
export { auth };

export const db = getFirestore(app);