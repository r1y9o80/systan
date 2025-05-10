// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtJyRyfl-tf82Y8nguh_OEcOLkBylWU70",
    authDomain: "r1y9o80-quiz-app.firebaseapp.com",
    projectId: "r1y9o80-quiz-app",
    storageBucket: "r1y9o80-quiz-app.firebasestorage.app",
    messagingSenderId: "1071682165928",
    appId: "1:1071682165928:web:cbfd4cfe9c4887690bf69d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
