import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1IXhoQFBG3osWQZey_YRy33QlPDllWZA",
  authDomain: "mern-ecommerce-5c020.firebaseapp.com",
  projectId: "mern-ecommerce-5c020",
  storageBucket: "mern-ecommerce-5c020.appspot.com",
  messagingSenderId: "874742504047",
  appId: "1:874742504047:web:9b22a989701e1d195c4b9a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
