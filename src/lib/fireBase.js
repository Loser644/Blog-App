import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import fireBase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "codecove-c08fb.firebaseapp.com",
  projectId: "codecove-c08fb",
  storageBucket: "codecove-c08fb.firebasestorage.app",
  messagingSenderId: "520417278908",
  appId: "1:520417278908:web:70cbfc570bf7c31cab09b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realTimeDb = fireBase.initializeApp(firebaseConfig);
export default realTimeDb.database().ref()
export const auth = getAuth();
export const db = getFirestore(app);
