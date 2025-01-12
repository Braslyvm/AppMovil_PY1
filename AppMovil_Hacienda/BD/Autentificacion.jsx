import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBR-JK517NClnuDAeQlmkzMD5kPEcjvG0",
  authDomain: "fb-authentication-549f5.firebaseapp.com",
  projectId: "fb-authentication-549f5",
  storageBucket: "fb-authentication-549f5.appspot.com",
  messagingSenderId: "51010532888",
  appId: "1:51010532888:android:241230e5e3bf5a0d58f56d",
  measurementId: "G-51010532888"
};


const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


export { auth };
