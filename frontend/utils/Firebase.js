// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "loginonecart-e264b.firebaseapp.com",
  projectId: "loginonecart-e264b",
  storageBucket: "loginonecart-e264b.firebasestorage.app",
  messagingSenderId: "868318971651",
  appId: "1:868318971651:web:0e46b819298aea4a930b36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }