// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//使うプロジェクトID、ドメイン、キーなんかの情報
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



//ここからはログイン時にDOCにユーザー追加

import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// onAuthStateChangedでログイン状態を監視
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // ユーザーがログインしている場合
    const {uid: userId, displayName: name, photoURL: photoURL} = user;
    const docRef = doc(db, "users", userId); // ユーザーIDをドキュメントIDに使用
    
    // ドキュメントの存在確認なしでsetDocを実行（存在しない場合に新規作成される）
    await setDoc(docRef, {
      userId,
      name, // ログインしたユーザーの名前など
      photoURL
    }, { merge: true }); // merge: trueで既存ドキュメントに追加
  } else {
    // ユーザーがログインしていない場合の処理（任意）
    console.log("ログインしていません");
  }
});
