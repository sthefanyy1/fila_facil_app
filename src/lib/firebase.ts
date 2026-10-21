import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function cleanFirebaseValue(value: string | undefined) {
  return value?.trim().replace(/^['"]|['"]$/g, '').replace(/,$/, '');
}

const firebaseConfig = {
  apiKey: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanFirebaseValue(import.meta.env.VITE_FIREBASE_APP_ID),
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
