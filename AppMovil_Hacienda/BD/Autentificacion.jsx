// BD/Autentificacion.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBR-JK517NClnuDAeQlmkzMD5kPEcjvG0",
  authDomain: "fb-authentication-549f5.firebaseapp.com",
  projectId: "fb-authentication-549f5",
  storageBucket: "fb-authentication-549f5.appspot.com",
  messagingSenderId: "51010532888",
  appId: "1:51010532888:android:241230e5e3bf5a0d58f56d",
  measurementId: "G-51010532888"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que necesitas
export const auth = getAuth(app);
