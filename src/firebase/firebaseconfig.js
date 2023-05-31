// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAba77rLiR2l0VCRhFJF1qJ-UWAq8slVl4",
  authDomain: "clever-spirit-387013.firebaseapp.com",
  projectId: "clever-spirit-387013",
  storageBucket: "clever-spirit-387013.appspot.com",
  messagingSenderId: "760808330356",
  appId: "1:760808330356:web:45a6db567e2b87dd986d21",
  measurementId: "G-RKLGKRWCK9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const messaging = getMessaging(app)
export const auth = getAuth(app)