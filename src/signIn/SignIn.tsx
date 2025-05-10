import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const buttton_div_style = {
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100svh",
  width: "100svw"
}

const button_style = {
  backgroundColor: "rgb(75, 75, 248)",
  height: "50px",
  width: "200px",
  borderRadius: "5px",
  fontSize: "17px",
  color: "white",
}

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
    <div style={buttton_div_style}>
      <button style={button_style} onClick={SignInWithGoogle}>ログイン</button>
    </div>
  );
};
