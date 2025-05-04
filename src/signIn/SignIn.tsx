import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const SignIn = () => {
  function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .catch((error) => {
        console.error("Googleサインインに失敗しました:", error);
      });
  }

  return (
    <button onClick={SignInWithGoogle}>ログイン</button>
  );
};
