import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdTSE4dXiWWn0LN5Vwo4X1yoVheN0Jc8",
  authDomain: "tictonto-95976.firebaseapp.com",
  projectId: "tictonto-95976",
  storageBucket: "tictonto-95976.appspot.com",
  messagingSenderId: "125735061215",
  appId: "1:125735061215:web:df8081ba7b4a3e2a23cb6a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

