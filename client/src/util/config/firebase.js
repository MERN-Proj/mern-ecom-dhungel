// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw_K1BnKyP9K3jZ0FAj-A9u8XlIjB_HWk",
  authDomain: "tinyhouse-v2-333606.firebaseapp.com",
  projectId: "tinyhouse-v2-333606",
  storageBucket: "tinyhouse-v2-333606.appspot.com",
  messagingSenderId: "495270696533",
  appId: "1:495270696533:web:09630341a063ea797826dc",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const authProvider = new GoogleAuthProvider();
