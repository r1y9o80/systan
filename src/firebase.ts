// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBOOuLESVy1le8mGEcjhHWtZ3hYoT3VAqE",
    authDomain: "line-clone-test-2ddef.firebaseapp.com",
    projectId: "line-clone-test-2ddef",
    storageBucket: "line-clone-test-2ddef.firebasestorage.app",
    messagingSenderId: "545439968429",
    appId: "1:545439968429:web:d3b1e5aa26e6b6c09aaa24"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
