import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdTSE4dXiWWn0LN5Vwo4yXlyoVheN0Jc8",
  authDomain: "tictonto-95976.firebaseapp.com",
  projectId: "tictonto-95976",
  storageBucket: "tictonto-95976.appspot.com",
  messagingSenderId: "125735061215",
  appId: "1:125735061215:web:df8081ba7b4a3e2a23cb6a"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);
export default app;

