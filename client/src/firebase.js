// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1IXhoQFBG3osWQZey_YRy33QlPDllWZA",
  authDomain: "mern-ecommerce-5c020.firebaseapp.com",
  projectId: "mern-ecommerce-5c020",
  storageBucket: "mern-ecommerce-5c020.appspot.com",
  messagingSenderId: "874742504047",
  appId: "1:874742504047:web:9b22a989701e1d195c4b9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
